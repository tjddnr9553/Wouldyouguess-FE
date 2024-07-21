import "./Game2.css";
import "swiper/css";

import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import NewButton from "../../components/button/newButton";
import FDGUploadCanvas from "./canvas/FDGUploadCanvas.jsx";

import useUserStore from "../../store/user/useUserStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import useFDGCanvasStore from "../../store/game/findDiffGame/useFDGCanvasStore.js";
import useFDGFileStore from "../../store/game/findDiffGame/useFDGFileStore.js";

import {findDiff_game_images} from "../../api/game/FindDiff.js";
import FDGAiGeneratedCanvas from "./canvas/FDGAiGeneratedCanvas.jsx";

const Game2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const generatedImgRef = useRef(null);

  const [gameImages, setGameImages] = useState(null);
  const [chance, setChance] = useState(3);
  const [roundLength, setRoundLength] = useState(0);

  const { userId } = useUserStore();
  const { findDiffGameId } = useFDGStore();
  const { play, stop } = useAudioStore();

  const { setOriginalImage, setAiGeneratedImage } = useFDGFileStore();
  const { answerClick, answerX, answerY } = useFDGCanvasStore();


  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");
    return () => {
      stop();
    };
  }, [])

  useEffect(() => {
    const sync_func = async () => {
        const res = await findDiff_game_images(findDiffGameId, userId);
        setGameImages(res[round - 1]);
        setOriginalImage(res[round - 1].originalImageUrl);
        setRoundLength(res.length);
        setChance(3);
    }

    sync_func();
  }, [round]);

  useEffect(() => {
    setTimeout(() => {
      setAiGeneratedImage(gameImages.aiGeneratedImageUrl);
    }, 3000);
  }, []);

  useEffect(() => {
    if (answerClick) {
      checkAnswerAndCondition();
    }
  }, [answerClick])

  const checkAnswerAndCondition = () => {

    // 정답
    const maskX1 = gameImages.maskX1;
    const maskY1 = gameImages.maskY1;
    const maskX2 = gameImages.maskX2;
    const maskY2 = gameImages.maskY2;

    if (maskX1 <= answerX && answerX <= maskX2 && maskY1 <= answerY && answerY <= maskY2) {
      round === roundLength ? navigate(`/game2/result`) : navigate(`/game2?round=${round + 1}`);
    } else {
      setChance(chance - 1);

      if (chance === 0) {
        round === roundLength ? navigate(`/game2/result`) : navigate(`/game2?round=${round + 1}`);
      }
    }

  }
  

  return (
    <div className="inner">
      <div className="game2 container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Find Difference !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDifference containerWrapper" >
                <div className="generatedImg game2-canvas-container" ref={generatedImgRef} >
                  <FDGUploadCanvas />
                  <FDGAiGeneratedCanvas />
                </div>
              </div>
              <div className="magnifierContainer">
                <NewButton
                  text={
                    Array.from({ length: chance }, (_, index) => (
                      <img key={index} src="/images/magnifier.png" style={{ width: "2rem" }}/>
                    ))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2;
