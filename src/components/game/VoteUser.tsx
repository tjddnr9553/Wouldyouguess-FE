import React, { useEffect, useState } from "react";
import Video from "../../pages/game2/Video";
import AudioComponent from "../webrtc/AudioComponent";
import useUserStore from "../../store/user/useUserStore";
import useCatchLiarStore from "../../store/game/useCatchLiarStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";
import { catchLiar_result } from "../../api/game/CatchLiar";

const VoteUser = ({ targetId }) => {
  const [players, setPlayers] = useState([]);

  const { userId } = useUserStore();
  const { gameId } = useCatchLiarStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_result(gameId, userId);
      setPlayers(res);
    }
    sync_func();
  }, []);

  const getPlayerUsername = (participantIdentity) => {
    if (players.length === 0) return ;
    const player = players.find(player => Number(participantIdentity) === Number(player.userId));
    return player.username;
  }

  const getPlayerIsSpy = (participantIdentity) => {
    if (players.length === 0) return ;
    const player = players.find(player => Number(participantIdentity) === Number(player.userId));
    return player.isLiar;
  }

  const getPlayerIsWinner = (participantIdentity) => {
    if (players.length === 0) return ;
    const player = players.find(player => Number(participantIdentity) === Number(player.userId));
    return player.isWinner;
  }


  return (
    <div
      className="voteUser-layout-container"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      {
        // localTrack은 targetIdArray 배열에 userId가 포함될 때만 렌더링
          players && localTrack && (
          <Video
            track={localTrack}
            participantIdentity={userId}
            color=""
            classNameCss="video-container"
            username={getPlayerUsername(userId)}
            isSpy={getPlayerIsSpy(userId)}
            isWinner={getPlayerIsWinner(userId)}
          />
        )
      }
      {players && remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
           (
            <Video
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
              color={''}
              classNameCss="video-container"
              username={getPlayerUsername(remoteTrack.participantIdentity)}
              isSpy={getPlayerIsSpy(remoteTrack.participantIdentity)}
              isWinner={getPlayerIsWinner(remoteTrack.participantIdentity)}
            />
          )
        ) : (
          <AudioComponent
            key={remoteTrack.trackPublication.trackSid}
            track={remoteTrack.trackPublication.audioTrack!}
          />
        )
      )}
    </div>
  );
};

export default VoteUser;
