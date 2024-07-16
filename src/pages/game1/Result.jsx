import "./Result.css";
import PlayerResult from "../../components/game/PlayerResult.jsx";
import { useEffect, useState } from "react";
import { catchLiar_result } from "../../api/game/CatchLiar.js";
import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";

const Result = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_result(gameId, userId);
      setPlayers(res);
    };
    sync_func();
  }, []);

  const goHome = () => {
    navigate(`/lobby/${roomId}`);
  };

  return (
    <div className="result inner">
      <div className="title">
        <strong>Result</strong>
      </div>
      <div className="player-list">
        {players.map((player, index) => (
          <PlayerResult
            key={index}
            player={`Player${index + 1}`}
            nickname={player.nickname}
            score={player.score}
            liar_img={player.liar && <img src="/images/game/liar.png" />}
            isWinner={player.isWinner}
          />
        ))}
      </div>
      <button onClick={goHome} className="homeBtn">
        HOME
      </button>
    </div>
  );
};

export default Result;
