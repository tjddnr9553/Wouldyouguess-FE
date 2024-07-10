import './Game1.css'
import User from "../../components/game/User.jsx";
import Drawing from "./canvas/Drawing.jsx";
import Palette from "./canvas/Palette.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import useSocketStore from "../../store/socket/useSocketStore.js";
import Tools from './canvas/CanvasTools.jsx';
import Clock from '../../components/game/Clock.jsx';

const Game1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const containerRef = useRef(null);

  const [parentwidth, setParentWidth] = useState(0);
  const [parentheight,setParentHeight] = useState(0);

  const  [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // window size 변경 시 캔버스 좌표 수정을 위한 resize
  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    setParentWidth(containerRef.current.clientWidth);
    setParentHeight(containerRef.current.clientHeight);
  }, [windowSize])
  
  const socket = useSocketStore(state => state.socket);

  // 다음 사람 턴으로 이동하거나 결과 창
  const nextTurnOrResult = () => {
    const turn = searchParams.get('turn');

    if (turn < 5) {
      socket.on("game_turn_change", handleGameTurnChange);
      navigate(`/game1?turn=${turn + 1}`)
    } else {
      socket.on("game_end", handleGameEnd);
      navigate(`/game1/result`)
    }
  }

  const handleGameTurnChange = (message) => {
    console.log('game_turn_change 전송:', message);
    // 필요시 추가 로직
  };

  const handleGameEnd = (message) => {
    console.log('game_end 전송:', message);
    // 필요시 추가 로직
  };

  useEffect(() => {
    return () => {
      socket?.off("game_turn_change", handleGameTurnChange);
      socket?.off("game_end", handleGameEnd);
    }
  }, [])


  return(
      <div className="inner">
        <div className="game container">
          <div className="left-section">
            <User />
            <User />
            <User />
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
      </div>

  )
}

export default Game1;