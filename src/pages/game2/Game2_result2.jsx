import "./Game2_result2.css";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PlayerResult from "../../components/game/PlayerResult.jsx";

import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";

import {findDiff_result} from "../../api/game/FindDiff.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import Game2_playerResult from "./Game2_playerResult.jsx";

const Game2_result2 = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const { roomId } = useRoomStore();
  const { findDiffGameId } = useFDGStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await findDiff_result(findDiffGameId);
      setPlayers(res);
    };
    sync_func();
  }, []);

  const goHome = () => {
    navigate(`/lobby/${roomId}`);
  };

  return (
    <div className="game2 result inner">
      <div className="title">
        <strong>Result</strong>
      </div>
      <div className="player-list">
        {players.map((player, index) => (
          <Game2_playerResult
            key={index}
            player={`${index + 1}`}
            nickname={player.nickname}
            score={player.score}
          />
        ))}
      </div>
      <button onClick={goHome} className="homeBtn">
        HOME
      </button>
    </div>
  );
};

export default Game2_result2;
