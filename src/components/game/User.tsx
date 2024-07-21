import React, { useEffect } from "react";
import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";
import useUserStore from "../../store/user/useUserStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

const User = ({ targetId }) => {
  const { username } = useUserStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  const colors = ["blue", "purple", "green"];
  let i = 0;

  useEffect(() => {
    i = 0;
  }, [targetId]);

  return (
    <div id="layout-container">
      {localTrack && (
        <VideoComponent
          track={localTrack}
          participantIdentity={username}
          local={true}
          color="red"
        />
      )}
      {remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
          <VideoComponent
            key={remoteTrack.trackPublication.trackSid}
            track={remoteTrack.trackPublication.videoTrack!}
            participantIdentity={remoteTrack.participantIdentity}
            color={colors[i++]}
            local={false}
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
