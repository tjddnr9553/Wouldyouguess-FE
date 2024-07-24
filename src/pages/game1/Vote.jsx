import "./Vote.css";
import React, { useEffect, useRef, useState } from "react";

import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";

import useAudioStore from "../../store/bgm/useAudioStore";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";

import {
  catchLiar_vote_candidates,
} from "../../api/game/CatchLiar.js";
import VoteGaugebar from "./VoteGaugebar.jsx";

const Vote = () => {
  const [players, setPlayers] = useState([]);
  const previewImage = useRef(null);
  const [gameStart, setGameStart] = useState(true); // 게임 시작 상태, 30초 시작
  const { userId, username } = useUserStore();
  const { gameId } = useCatchLiarStore();
  const { localTrack, remoteTracks } = useWebrtcStore();
  const { play, stop } = useAudioStore();

  const colors = ["blue", "purple", "green", "red"];

  // useEffect(() => {
  //   play("/bgm/Game1_bgm.mp3");
  //   return () => {
  //     stop();
  //   };
  // }, []);

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_vote_candidates(gameId);
      setPlayers(res);
    };

    sync_func();
  }, []);

  return (
    <div className="inner">
      <div className="game container">
        <div className="center">
          <VoteGaugebar
            gameStart={gameStart}
            setGameStart={setGameStart}
          />
          <div className="game2_border">
            <div className="titleContainer">
              <strong>Vote</strong>
            </div>
            <div className="imageContainer">
              <div className="findDiffrence" ref={previewImage}>
                {players &&
                  players.map((player, index) => {
                    const isCurrentUser = player.userId === userId;
                    const boxShadowStyle = `0 0 15px 15px ${colors[index]}`;

                    return (
                      <div
                        key={index}
                        data-user-id={player.userId}
                        className="user-painting"
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
                              <img
                                src={player.imagePath}
                                alt={`${player.userId} image`}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {remoteTracks.map((remoteTrack) => {
                              if (
                                String(remoteTrack.participantIdentity) ===
                                String(player.userId)
                              ) {
                                return remoteTrack.trackPublication.kind ===
                                  "video" ? (
                                  <React.Fragment
                                    key={remoteTrack.trackPublication.trackSid}
                                  >
                                    <VideoComponent
                                      track={
                                        remoteTrack.trackPublication.videoTrack
                                      }
                                      participantIdentity={
                                        remoteTrack.participantIdentity
                                      }
                                      color={colors[index]}
                                      local={false}
                                      classNameCss={"vote-camera"}
                                    />
                                    <div
                                      id={`image${index}`}
                                      className="img-border"
                                    >
                                      <img
                                        src={player.imagePath}
                                        alt={`${player.userId} image`}
                                      />
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <AudioComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={
                                      remoteTrack.trackPublication.audioTrack
                                    }
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

export default Vote;
