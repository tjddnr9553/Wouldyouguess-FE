import "./Game1.css";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import User from "../../components/game/User.tsx";
import Drawing from "./canvas/Drawing.jsx";
import Palette from "./canvas/Palette.jsx";
import Tools from "./canvas/CanvasTools.jsx";
import Clock from "../../components/game/Clock.jsx";

import { catchLiar_info } from "../../api/game/CatchLiar.js";

import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import Keyword from "../../components/game/Keyword.jsx";

const Game1 = () => {
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const containerRef = useRef(null);

  const [parentwidth, setParentWidth] = useState(0);
  const [parentheight, setParentHeight] = useState(0);
  const [waitText, setWaitText] = useState(null);
  const [showModal, setShowModal] = useState(true); // 모달 표시 상태
  const [clockStart, setClockStart] = useState(false); // 시계 시작 상태
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { userId } = useUserStore();
  const {
    gameId,
    keyword,
    isDrawing,
    setIsDrawing,
    setIsLiar,
    setKeyword,
    setTotalRound,
  } = useCatchLiarStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game1_bgm.mp3");

    return () => {
      stop();
    };
  }, [])

  useEffect(() => {
    const sync_func = async () => {
      const response = await catchLiar_info(gameId, userId, round);
      setIsDrawing(response.isDrawing);
      setIsLiar(response.isLiar);
      setKeyword(response.keyword);
      setTotalRound(response.totalRound);
    };
    sync_func();

    setShowModal(true);

    // 5초 후에 모달 닫고 시계 시작
    const timer = setTimeout(() => {
      setShowModal(false);
      setClockStart(true); // 시계 시작 상태 변경
    }, 5000);

    if (isDrawing) {
      console.log("이번 턴은 그리는 턴");
      setWaitText(null);
      setIsDrawing(false);
      setKeyword(keyword);
      console.log("나의 키워드는 ", keyword);
    } else {
      console.log("이번 턴은 관전하는 턴");
      setWaitText("이번은 관전하는 턴");
    }
    return () => clearTimeout(timer);
  }, [round]);

  // window size 변경 시 캔버스 좌표 수정을 위한 resize
  useEffect(() => {
    window.addEventListener("resize", () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
    setParentWidth(containerRef.current.clientWidth);
    setParentHeight(containerRef.current.clientHeight);
  }, [windowSize]);

  return (
    <div className="inner" key={round}>
      <div className="game container">
        <div className="left-section">
          <User />
        </div>
        <div className="center">
          {showModal && isDrawing && <Keyword text={keyword}></Keyword>}
          {showModal && !isDrawing && <Keyword text={waitText}></Keyword>}
          <div className="keyword">Keyword: {keyword}</div>
          <div ref={containerRef} className="canvas-container">
            <Drawing width={parentwidth} height={parentheight} />
          </div>
          <div className="canvas-tools">
            <Tools />
          </div>
        </div>
        <div className="right-section">
          {clockStart && <Clock />}
          <Palette />
        </div>
      </div>
    </div>
  );
};

export default Game1;
