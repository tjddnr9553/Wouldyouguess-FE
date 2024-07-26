import "./Game1.css";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import User from "../../components/game/User.tsx";
import Drawing from "./canvas/Drawing.jsx";
import Palette from "./canvas/Palette.jsx";
import Tools from "./canvas/CanvasTools.jsx";
import Ailen from "../../components/game/Ailen.jsx";
import LaserPointer from "./LaserPointer.jsx";
import Keyword from "../../components/game/Keyword.jsx";
import Gaugebar from "./Gaugebar.jsx";
import ModalKeyword from "../../components/game/ModalKeyword.jsx";

import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import { useCanvasStore } from "../../store/canvas/useCanvasStore.js";

import { catchLiar_info } from "../../api/game/CatchLiar.js";

const Game1 = () => {
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const containerRef = useRef(null);
  const keywordRef = useRef(null);

  const [waitText, setWaitText] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [gameStart, setGameStart] = useState(false); // 게임 시작 상태, 30초 시작
  const [showKeyword, setShowKeyword] = useState(true);
  const [thisTurnUser, setThisTurnUser] = useState(null);

  const { userId, nickname, cameraId, isLocal } = useUserStore();
  const { setTool, setColor } = useCanvasStore();
  const {
    gameId,
    keyword,
    isDrawing,
    setIsDrawing,
    setIsLiar,
    setKeyword,
    setThisTurnUserId,
    setTotalRound,
    setUserColor
  } = useCatchLiarStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game1_bgm.mp3");

    keywordRef.current.style.display = "block";
    setTimeout(() => {
      keywordRef.current.style.display = "none";
    }, 4000);

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const response = await catchLiar_info(gameId, userId, round);
      setIsDrawing(response.isDrawing);
      setIsLiar(response.isLiar);
      setKeyword(response.keyword);
      setTotalRound(response.totalRound);
      setThisTurnUser(response.thisTurnNick);
      setThisTurnUserId(response.thisTurnUserId);
      setUserColor(response.userColor);
    };
    sync_func();
    setTool("pencil");
    setColor("black");

    if (isDrawing) {
      setWaitText(null);
      setKeyword(keyword);
    } else {
      setWaitText(`${nickname}님이 그릴 순서!`);
    }

    if (round === 1) {
      const timer = setTimeout(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setGameStart(true);
        }, 6000);
        setShowKeyword(false);
      }, 3500);
      return () => {
        setShowModal(false);
        setGameStart(false);
        clearTimeout(timer);
      };
    } else {
      setGameStart(false);
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setGameStart(true); // 시계 시작 상태 변경
      }, 6000);

      return () => {
        setShowModal(false);
        setGameStart(false);
        clearTimeout(timer);
      };
    }
  }, [round]);

  return (
    <div className="inner" key={round}>
      {showModal && isDrawing && <Ailen keyword={"내가 그릴 순서!"} />}
      {showModal && !isDrawing && thisTurnUser && (
        <Ailen keyword={`${thisTurnUser}님이 그릴 순서!`} />
      )}
      <div ref={keywordRef}>{showKeyword && <ModalKeyword keyword={keyword} />}</div>
      <div className="game container">
        <div className="left-section">
          <User />
        </div>
        <div className="center">
          <Gaugebar
            gameStart={gameStart}
            setGameStart={setGameStart}
            time={round === 1 ? 9500 : 6000}
          />
          <div className="drawing-container">
            <div className="keyword-title">
            </div>
            <div ref={containerRef} className="canvas-container">
              <Keyword keyword={keyword}/>
              <Drawing
                zIndex={isDrawing ? 10 : 9}
                position={isDrawing ? "absolute" : "relative"}
              />
              <LaserPointer
                zIndex={!isDrawing ? 10 : 9}
                position={!isDrawing ? "absolute" : "relative"}
              />
            </div>
          </div>
          <div className="canvas-tools"></div>
        </div>
        <div className="right-section">
          <Tools />
          <Palette />
        </div>
      </div>
    </div>
  );
};

export default Game1;
