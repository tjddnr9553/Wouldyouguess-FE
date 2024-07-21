import "./Result.css";
import PlayerResult from "../../components/game/PlayerResult.jsx";
import { useEffect, useState } from "react";
import { catchLiar_result } from "../../api/game/CatchLiar.js";
import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";

const dummy = [
  {
    nickname: '채윤',
    role: '라이어',
    isWin: 'lose',
  },
  {
    nickname: '현민',
    role: '일반시민',
    isWin: 'win',
  },
  {
    nickname: '성욱',
    role: '일반시민',
    isWin: 'win',
  },
  {
    nickname: '광윤',
    role: '일반시민',
    isWin: 'win',
  },
]

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
    <div className="result">
      <div className="title">
        <div className="result-title">
          {dummy.find(player => player.isWin === 'win').role} 승리 !!
        </div>
      </div>
      <div className="player-list">
        {dummy.map((player, index) => (
          player.isWin === 'win' &&
          (
          <div key={index} >
            <div className="nick">{player.nickname}</div>
            <div className="player-video"> 영상 들어갈 곳 </div>
          </div>  
          )
        ))}
      </div>
      <button onClick={goHome} className="homeBtn">
        HOME
      </button>
    </div>
  );
};

export default Result;
