import "./Vote.css";
import { useEffect, useRef, useState } from "react";
import useAudioStore from "../../store/bgm/useAudioStore";
import {
  catchLiar_vote,
  catchLiar_vote_candidates,
} from "../../api/game/CatchLiar.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import { useNavigate } from "react-router-dom";
import User from "../../components/game/User.tsx";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";

const Result1 = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [isLiarVoteEnded, setIsLiarVoteEnede] = useState(false);

  const previewImage = useRef(null);

  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { socket } = useSocketStore();
  const { play, stop } = useAudioStore();

  const colors = [
    "blue", // Blue
    "purple", // Purple
    "green", // Green
  ];

  useEffect(() => {
    play("/bgm/Game1_bgm.mp3");
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_vote_candidates(gameId);
      setPlayers(res);
    };

    sync_func();
  }, []);

  const liarVote = async (e) => {
    const votingUserId = Number(e.currentTarget.getAttribute("data-user-id"));
    await catchLiar_vote(gameId, votingUserId);

    navigate(`/loading`, { state: { title: "라이어 투표 중입니다." } });
    socket?.emit("game_loading", { roomId, nextPageUrl: "/game1/result" });
  };
  let i = 0;
  return (
    <div className="inner">
      <div className="game container">
        <div className="left-section">
          <User />
        </div>
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
                  players.map((player, index) =>
                    index === 1 ? (
                      <div
                        key={index}
                        data-user-id={player.userId}
                        className="user-painting"
                        onClick={liarVote}
                        style={{
                          boxShadow: "0 0 15px 15px red",
                          margin: "5%",
                          borderRadius: "inherit",
                        }}
                      >
                        <div id={`image${index}`} className="img-border">
                          <img
                            src={player.imagePath}
                            alt={`${player.userId} image`}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        data-user-id={player.userId}
                        className="user-painting"
                        onClick={liarVote}
                        style={{
                          boxShadow: `0 0 15px 15px ${colors[i++]}`,
                          margin: "5%",
                          borderRadius: "inherit",
                        }}
                      >
                        <div id={`image${index}`} className="img-border">
                          <img
                            src={player.imagePath}
                            alt={`${player.userId} image`}
                          />
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result1;
