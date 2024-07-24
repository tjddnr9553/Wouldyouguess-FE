import "./Game2.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import NewButton from "../../components/button/newButton";

import useUserStore from "../../store/user/useUserStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import useFDGCanvasStore from "../../store/game/findDiffGame/useFDGCanvasStore.js";

import {
  findDiff_game_images,
  findDiff_update_score,
} from "../../api/game/FindDiff.js";
import FDGAiGeneratedCanvas from "./canvas/FDGAiGeneratedCanvas.jsx";
import useRoomStore from "../../store/room/useRoomStore.js";
import useSocketStore from "../../store/socket/useSocketStore.js";

const Game2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const generatedImgRef = useRef(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const [startSearch, setStartSearch] = useState(false);
  const [endSearch, setEndSearch] = useState(false);
  const [gameImages, setGameImages] = useState(null);
  const [chance, setChance] = useState(3);
  const [roundLength, setRoundLength] = useState(0);

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { socket } = useSocketStore();
  const { findDiffGameId } = useFDGStore();
  const { play, stop } = useAudioStore();

  // const { answerClick, answerX, answerY } = useFDGCanvasStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");
    return () => {
      stop();
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setStartSearch(true);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await findDiff_game_images(findDiffGameId, userId);
      setGameImages(res[round - 1]);
      setRoundLength(res.length);
      setChance(3);
    };

    setIsBlurred(false);
    setTimeout(() => setIsBlurred(true), 100); // 0.1초 후에 블러 적용

    sync_func();
  }, [round]);

  useEffect(() => {
    if (chance === 0) {
      findDiff_update_score(userId, chance, false);
      // setStartSearch(true);
      setEndSearch(true);
    }
  }, [chance]);

  const checkAnswerAndCondition = async (answerX, answerY) => {
    // 정답
    const maskX1 = gameImages.maskX1;
    const maskY1 = gameImages.maskY1;
    const maskX2 = gameImages.maskX2;
    const maskY2 = gameImages.maskY2;

    if (
      maskX1 <= answerX &&
      answerX <= maskX2 &&
      maskY1 <= answerY &&
      answerY <= maskY2
    ) {
      await findDiff_update_score(userId, chance, true);
      // setStartSearch(true);
      setEndSearch(true);

      return true;
    } else {
      setChance(chance - 1);

      return false;
    }
  };

  const goNextPage = () => {
    if (round === roundLength) {
      navigate(`/loading`, {
        state: { title: "다른 플레이어들을 기다리고 있습니다." },
      });
      socket?.emit("game_loading", { roomId, nextPageUrl: "/game2/result2" });
    } else {
      setEndSearch(false);
      navigate(`/game2?round=${round + 1}`);
    }
  };

  return (
    <div className="inner">
      <div className="game2 container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div style={{ position: "relative" }}>
                <strong>Find Difference !</strong>
                <img
                  src="/images/game/game2/arrow.png"
                  className="find-arrow"
                />
              </div>
            </div>
            <div className="imageContainer">

              <div className="findDifference containerWrapper">
                <div
                  className="generatedImg game2-canvas-container"
                  ref={generatedImgRef}
                >
                  {gameImages && (
                    <img
                      className="original-img-wrap"
                      src={gameImages.originalImageUrl}
                      alt="ai-img"
                      style={{
                        animation: `${
                          isBlurred ? "blur 25s forwards" : "none"
                        }`,
                      }}
                    />
                  )}
                  {gameImages && (
                    <FDGAiGeneratedCanvas
                      image={gameImages && gameImages.aiGeneratedImageUrl}
                      mode={"findDifference"}
                      endSearch={endSearch}
                      maskX1={gameImages.maskX1}
                      maskY1={gameImages.maskY1}
                      maskX2={gameImages.maskX2}
                      maskY2={gameImages.maskY2}
                      checkAnswerAndCondition={checkAnswerAndCondition}
                    />
                  )}
                </div>
              </div>

              <div className="magnifierContainer">
                {!endSearch ? (
                  <NewButton
                    text={Array.from({ length: chance }, (_, index) => (
                      <img
                        key={index}
                        src="/images/magnifier.png"
                        style={{ width: "2rem" }}
                      />
                    ))}
                  />
                ) : (
                  <NewButton
                    text={
                      round === roundLength ? "결과 보기" : "다음 문제 보기"
                    }
                    onClick={goNextPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2;
