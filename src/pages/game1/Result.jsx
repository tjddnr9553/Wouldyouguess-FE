import "./Result.css";
import { useEffect, useState } from "react";
import { catchLiar_result } from "../../api/game/CatchLiar.js";
import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import User from "../../components/game/User.tsx";
import VoteUser from "../../components/game/VoteUser.tsx";

import { catchLiar_result } from "../../api/game/CatchLiar.js";

const Result = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [winnerIds, setWinnerIds] = useState([]);
  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { play, stop } = useAudioStore();
  const { remoteTracks } = useWebrtcStore();

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_result(gameId, userId);
      console.log(res);
      setPlayers(res);

      // winnerIds 업데이트 로직 (async/await 사용)
      const newWinnerIds = res
        .filter((player) => player.isWinner)
        .map((player) => player.userId);
      setWinnerIds(newWinnerIds);
    };

    sync_func();
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 실행

  const goHome = () => {
    navigate(`/lobby/${roomId}`);
  };

  return (
    <div className="result">
      <div className="title">
        <div className="result-title">
          {players.find((player) => player.isWinner)?.isLiar
            ? "라이어"
            : "시민"}{" "}
          승리 !!
        </div>
      </div>
      <div className="player-list">
        {winnerIds &&
          winnerIds.length > 0 &&
          remoteTracks.length > 0 && ( // remoteTracks 길이 확인 추가
            <VoteUser targetId={winnerIds} />
          )}
      </div>
      <button onClick={goHome} className="homeBtn">
        HOME
      </button>
    </div>
  );
};

export default Result;
