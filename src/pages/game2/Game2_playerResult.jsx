import "./Game2_playerResult.css";
import useUserStore from "../../store/user/useUserStore";
import { useEffect, useRef } from "react";

const Game2_playerResult = ({ player, userNickname, score }) => {
  const {nickname} = useUserStore();

  return (
    <div className="game2-result">
      <div className="playerResult">
        <div className={`leftItem ${userNickname === nickname ? 'highlight' : '' }`}>
          <p>{player}</p>
        </div>
        <div className="rightItem">
          <div className="nickname">
            <div>
              <p>{userNickname}</p>
            </div>
          </div>
          <div className="originScore">{score}</div>
        </div>
      </div>
    </div>
  );
};

export default Game2_playerResult;
