import "./Result.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import VoteUser from "../../components/game/VoteUser.tsx";

import useUserStore from "../../store/user/useUserStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";

import {catchLiar_keyword, catchLiar_result} from "../../api/game/CatchLiar.js";


const dummy2 = {
  liar: "아이스크림",
  normal: "아이스링크",
  win: "normal",
};

const Result = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [winnerIds, setWinnerIds] = useState([]);
  const [keyword, setKeyword] =
                        useState({liar : "", normal : "", win : "" })

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId ,setIsVotePage } = useCatchLiarStore();
  const { play, stop } = useAudioStore();
  const { remoteTracks } = useWebrtcStore();

  const showKewordRef = useRef(null);

  const isLiarWin = players.find((player) => player.isWinner)?.isLiar || false; // 라이어 승리 여부

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_keyword(gameId);
      setKeyword((prevState) => ({
        ...prevState,
        liar: res.liarKeyword,
        normal: res.keyword
      }));
    }
    sync_func();
  }, [])

  useEffect(() => {
    if (players.length === 0) return ;
    if (!players.find((player) => player.isWinner)?.isLiar) {
      showKewordRef.current.firstChild.classList.add("winKeyword");
      showKewordRef.current.lastChild.classList.add("loseKeyword");
    } else {
      showKewordRef.current.firstChild.classList.add("loseKeyword");
      showKewordRef.current.lastChild.classList.add("winKeyword");
    }
  }, [players]);

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    setIsVotePage(true);
  }, [])


  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_result(gameId, userId);
      setPlayers(res);

      // winnerIds 업데이트 로직 (async/await 사용)
      const newWinnerIds = res
        .filter((player) => player.isWinner)
        .map((player) => player.userId);
      setWinnerIds(newWinnerIds); 
    };

    sync_func();
  }, []);

  const goHome = () => {
    navigate(`/lobby/${roomId}`);
  };

  return (
    <div className="game1 result">
      <div className="title">
        <div className="result-title">
          {players.find((player) => player.isWinner)?.isLiar
            ? "Spy  Win !"
            : "Player Win !"}{" "}
        </div>
      </div>  
      <div
        className={`winnerVideo-container ${
          isLiarWin ? "liar-win" : "citizen-win"
        }`}
      >
        <div className="player-list1">
          {winnerIds && winnerIds.length > 0 && remoteTracks.length > 0 && (
            <VoteUser targetId={winnerIds} />
          )}
        </div>
      </div>

      <div className="showKeyword" ref={showKewordRef}>
        <div className="normalKeyword">Player <span>{keyword && keyword.normal}</span></div>
        <div className="liarKeyword">Spy <span>{keyword && keyword.liar}</span></div>
      </div>
      <button onClick={goHome} className="homeBtn"></button>
    </div>
  );
};

export default Result;
