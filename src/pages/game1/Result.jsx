import "./Result.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";

import { catchLiar_result } from "../../api/game/CatchLiar.js";

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

const dummy2 = {
  liar: '풋사과',
  normal: '사과',
  win: 'normal'
}

const Result = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { play, stop } = useAudioStore();

  const showKewordRef = useRef(null);

  useEffect(() => {
    if(showKewordRef.current && dummy2) {
      if(dummy2.win === 'normal') {
        showKewordRef.current.firstChild.classList.add('winKeyword');
        showKewordRef.current.lastChild.classList.add('loseKeyword');
      } else {
        showKewordRef.current.firstChild.classList.add('loseKeyword');
        showKewordRef.current.lastChild.classList.add('winKeyword');

      }
    }
  }, [dummy2])

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
            <p className="nick">{player.nickname}</p>
            <div className="player-video"> 영상 들어갈 곳 </div>
          </div>
          )
        ))}
      </div>
      <div className="showKeyword" ref={showKewordRef}>
        <div className="normalKeyword">normal {dummy2.normal}</div>
        <div className="liarKeyword">liar {dummy2.liar}</div>
      </div>
      <button onClick={goHome} className="homeBtn">
      </button>
    </div>
  );
};

export default Result;
