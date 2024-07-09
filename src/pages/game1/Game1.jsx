import './Game1.css'
import User from "../../components/game/User.jsx";
import Drawing from "./canvas/Drawing.jsx";
import Timer from "../../components/game/Timer.jsx";
import Palette from "./canvas/Palette.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import useSocketStore from "../../store/socket/useSocketStore.js";


const Game1 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
  },[])


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
            <Drawing />
          </div>
          <div className="right-section">
            <Timer />
            <Palette />
            <button className="quite-btn">DONE</button>
          </div>
        </div>
      </div>

  )
}

export default Game1;