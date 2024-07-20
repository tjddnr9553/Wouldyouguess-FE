import "./Vote.css";
import { useEffect, useRef, useState } from "react";
import useAudioStore from "../../store/bgm/useAudioStore";
import {
  catchLiar_vote,
  catchLiar_vote_candidates,
} from "../../api/game/CatchLiar.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import { useNavigate } from "react-router-dom";

import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import User from "../../components/game/User.tsx";

const Result1 = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  // const [isLiarVoteEnded, setIsLiarVoteEneded] = useState(false);
  const previewImage = useRef(null);

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { socket } = useSocketStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game1_bgm.mp3");
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_vote_candidates(gameId);
      console.log(res);
      setPlayers(res);
    };

    sync_func();
  }, []);

  const liarVote = async (e) => {
    const votingUserId = Number(e.currentTarget.getAttribute("data-user-id"));
    await catchLiar_vote(gameId, votingUserId);

    socket?.emit("game_loading", { roomId, nextPageUrl: "/game1/result" });
    navigate(`/loading`, { state: { title: "라이어 투표 중입니다." } });
  };

  return (
    <div className="inner">
      <div className="game container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Vote</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDiffrence" ref={previewImage}>
                {players &&
                  players.map((player, index) => (
                    <div
                      key={index}
                      data-user-id={player.userId}
                      className="user-painting"
                      onClick={liarVote}
                    >
                      <div className="img-border">
                        <div className="user-video">
                          <User vote={player.userId} />
                        </div>
                        <div className="vote-img-container">
                          <div id={`image${index}`}>
                            <img
                              className="user-image"
                              src={player.imagePath}
                              alt={`${player.userId} image`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result1;
