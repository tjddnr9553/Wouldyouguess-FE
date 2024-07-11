import "./Game1.css";
import User from "../../components/game/User.tsx";
import Drawing from "./canvas/Drawing.jsx";
import Palette from "./canvas/Palette.jsx";
import {useEffect, useRef, useState} from "react";
import Tools from './canvas/CanvasTools.jsx';
import Clock from '../../components/game/Clock.jsx';
import {catchLiar_info} from "../../api/game/CatchLiar.js";
import useUserStore from "../../store/user/useUserStore.js";
import {useSearchParams} from "react-router-dom";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";

const Game1 = () => {
  const [searchParams] = useSearchParams();

  const containerRef = useRef(null);

  const [parentwidth, setParentWidth] = useState(0);
  const [parentheight,setParentHeight] = useState(0);
  const  [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { userId } = useUserStore();
  const { gameId, setIsDrawing, setIsLiar, setKeyword } = useCatchLiarStore();

  useEffect(() => {
    const syn_func = async () => {
      const round = Number(searchParams.get('round'));

      const response = await catchLiar_info(gameId, userId, round);
      setIsDrawing(response.isDrawing);
      setIsLiar(response.isLiar);
      setKeyword(response.keyword);

    }
    syn_func();
  }, [])

  // window size 변경 시 캔버스 좌표 수정을 위한 resize
  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    setParentWidth(containerRef.current.clientWidth);
    setParentHeight(containerRef.current.clientHeight);
  }, [windowSize])

  return(
      <div className="inner">
        <div className="game container">
          <div className="left-section">
            <User />
          </div>
          <div className="center">
            <div ref={containerRef} className="canvas-container">
              <Drawing  width={parentwidth} height={parentheight} />
              <Tools />
            </div>
          </div>
          <div className="right-section">
            <Clock />
            <Palette />
            <button className="quite-btn">DONE</button>
          </div>
        </div>
        <div className="center">
          <Drawing />
        </div>
        <div className="right-section">
          <Timer />
          <Palette />
          <button className="quite-btn">DONE</button>
        </div>
      </div>
  )
}

export default Game1;
