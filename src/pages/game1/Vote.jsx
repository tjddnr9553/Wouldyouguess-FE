import "./Vote.css";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";

import useAudioStore from "../../store/bgm/useAudioStore";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";

import {catchLiar_vote, catchLiar_vote_candidates,} from "../../api/game/CatchLiar.js";

const Result1 = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);

  const previewImage = useRef(null);

  const { userId, username } = useUserStore();
  const { roomId } = useRoomStore();
  const { gameId } = useCatchLiarStore();
  const { socket } = useSocketStore();
  const { localTrack, remoteTracks } = useWebrtcStore();
  const { play, stop } = useAudioStore();

  const colors = [
    "blue",
    "purple",
    "green",
    "red",
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


  return (
    <div className="inner">
      <div className="game container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
                <strong>Vote</strong>
            </div>
            <div className="imageContainer">
              <div className="findDiffrence" ref={previewImage}>

                {players && players.map((player, index) => {
                  const isCurrentUser = player.userId === userId;
                  const boxShadowStyle = `0 0 15px 15px ${colors[index]}`;

                  return (
                      <div
                          key={index}
                          data-user-id={player.userId}
                          className="user-painting"
                          onClick={liarVote}
                          style={{
                            boxShadow: boxShadowStyle,
                            margin: "5%",
                            borderRadius: "inherit",
                          }}
                      >
                        {isCurrentUser ? (
                            <>
                              <VideoComponent
                                  track={localTrack}
                                  participantIdentity={username}
                                  local={true}
                                  color={colors[index]}
                                  classNameCss={"vote-camera"}
                              />
                              <div id={`image${index}`} className="img-border">
                                <img src={player.imagePath} alt={`${player.userId} image`} />
                              </div>
                            </>
                        ) : (
                            <>
                              {remoteTracks.map((remoteTrack) => {
                                if (String(remoteTrack.participantIdentity) === String(player.userId)) {
                                  return remoteTrack.trackPublication.kind === "video" ? (
                                      <React.Fragment key={remoteTrack.trackPublication.trackSid}>
                                        <VideoComponent
                                            track={remoteTrack.trackPublication.videoTrack}
                                            participantIdentity={remoteTrack.participantIdentity}
                                            color={colors[index]}
                                            local={false}
                                            classNameCss={"vote-camera"}
                                        />
                                        <div id={`image${index}`} className="img-border">
                                          <img src={player.imagePath} alt={`${player.userId} image`} />
                                        </div>
                                      </React.Fragment>
                                  ) : (
                                      <AudioComponent
                                          key={remoteTrack.trackPublication.trackSid}
                                          track={remoteTrack.trackPublication.audioTrack}
                                      />
                                  );
                                }
                                return null; // Return null to avoid rendering empty fragments
                              })}
                            </>
                        )}
                      </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result1;
