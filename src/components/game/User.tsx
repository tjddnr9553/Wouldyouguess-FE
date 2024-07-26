import React, {useEffect, useState} from "react";

import useUserStore from "../../store/user/useUserStore";
import useCatchLiarStore from "../../store/game/useCatchLiarStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

import AudioComponent from "../webrtc/AudioComponent";
import VideoComponent from "../webrtc/VideoComponent";

import { catchLiar_info_list } from "../../api/game/CatchLiar"

const User = () => {
  const [camColor, setCamColor ] = useState([]);

  const { userId } = useUserStore();
  const { gameId, userColor, setUserColorList } = useCatchLiarStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  useEffect(() => {
    const sync_func = async () => {
      const res = await catchLiar_info_list(gameId);
      setCamColor(res);
      setUserColorList(res);
    }
    sync_func()
  }, [])

  const getUserColor = (camColor, participantIdentity) => {
    console.log(camColor);
    const user = camColor.find(user => Number(user.userId) === Number(participantIdentity));
    return user ? user.userColor : 'defaultColor';
  };

  return (
    <div id="layout-container">
      {userColor && localTrack && (
        <VideoComponent
          track={localTrack}
          participantIdentity={userId}
          color={userColor}
          classNameCss="video-container"
        />
      )}
      {camColor && remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
          <VideoComponent
            key={remoteTrack.trackPublication.trackSid}
            track={remoteTrack.trackPublication.videoTrack!}
            participantIdentity={remoteTrack.participantIdentity}
            color={getUserColor(camColor, remoteTrack.participantIdentity)}
            classNameCss="video-container"
          />
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

export default User;
