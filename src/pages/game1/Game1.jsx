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
import KeywordText from "../../components/game/KeywordText.jsx";
import LaserPointer from "./LaserPointer.jsx";

const Game1 = () => {
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const containerRef = useRef(null);

  const [parentwidth, setParentWidth] = useState(0);
  const [parentheight, setParentHeight] = useState(0);
  const [waitText, setWaitText] = useState(null);
  const [showModal, setShowModal] = useState(true); // 모달 표시 상태
  const [clockStart, setClockStart] = useState(false); // 시계 시작 상태
  const [titleOn, setTitleOn] = useState(false);
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
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const response = await catchLiar_info(gameId, userId, round);
      setIsDrawing(response.isDrawing);
      setIsLiar(response.isLiar);
      setKeyword(response.keyword);
      setTotalRound(response.totalRound);
    };
    sync_func();
  }, [round])

  useEffect(() => {
    if (isDrawing) {
      setWaitText(null);
      setKeyword(keyword);
    } else {
      setWaitText("다른 플레이어의 차례");
    }

    setClockStart(false);
    setShowModal(true);
    setTitleOn(false);

    setTimeout(() => {
      setTitleOn(true);
    }, 6000);

    // 5초 후에 모달 닫고 시계 시작
    const timer = setTimeout(() => {
      setShowModal(false);
      setClockStart(true); // 시계 시작 상태 변경
    }, 6000);
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
      {showModal && isDrawing && <Keyword keyword={keyword} />}
      {showModal && !isDrawing && <Keyword keyword={"다른 플레이어의 차례"} />}
      <div className="game container">
        <div className="left-section">
          <User />
        </div>
        <div className="center">
          <div className="keyword-title">
            {titleOn && isDrawing && <KeywordText text={keyword} />}
            {titleOn && !isDrawing && (
              <KeywordText text={"다른 플레이어의 차례"} />
            )}
            {/* <hr /> */}
          </div>
          <div className="drawing-container">
            <div ref={containerRef} className="canvas-container">
              <Drawing
                width={parentwidth * 0.9}
                height={parentheight * 0.9}
                zIndex={isDrawing ? 10 : 9}
                position={isDrawing ? "absolute" : "relative"}
              />
              <LaserPointer
                width={parentwidth * 0.9}
                height={parentheight * 0.9}
                zIndex={!isDrawing ? 10 : 9}
                position={!isDrawing ? "absolute" : "relative"}
              />
            </div>
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
