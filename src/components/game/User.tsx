import React, { useEffect } from "react";
import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";
import useUserStore from "../../store/user/useUserStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

const User = ({ vote }) => {
  const { userId } = useUserStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  return (
    <div id="layout-container">
      {localTrack && (
        <VideoComponent track={localTrack} participantIdentity={userId} />
      )}
      {!vote &&
        remoteTracks.map((remoteTrack) =>
          remoteTrack.trackPublication.kind === "video" ? (
            <VideoComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
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
