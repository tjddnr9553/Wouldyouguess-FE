import React from "react";

import useUserStore from "../../store/user/useUserStore";
import useCatchLiarStore from "../../store/game/useCatchLiarStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

import AudioComponent from "../webrtc/AudioComponent";
import VideoComponent from "../webrtc/VideoComponent";

const User = () => {

  const { userId } = useUserStore();
  const { userColor, userColorList } = useCatchLiarStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  const getUserColor = ( participantIdentity) => {
    const user = userColorList.find(user => Number(user.userId) === Number(participantIdentity));
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
      {userColorList && remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
          <VideoComponent
            key={remoteTrack.trackPublication.trackSid}
            track={remoteTrack.trackPublication.videoTrack!}
            participantIdentity={remoteTrack.participantIdentity}
            color={getUserColor(remoteTrack.participantIdentity)}
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
