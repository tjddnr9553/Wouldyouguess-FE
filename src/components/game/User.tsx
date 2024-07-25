import React from "react";
import VideoComponent from "../../components/webrtc/VideoComponent";
import useUserStore from "../../store/user/useUserStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

const colors = ["blue", "purple", "green"];

const User = ( ) => {
  const { userId } = useUserStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  return (
    <div id="layout-container">
      {localTrack && (
        <VideoComponent
          track={localTrack}
          participantIdentity={userId}
          color="red"
          classNameCss="video-container"
        />
      )}
      {remoteTracks.map((remoteTrack, index) =>
        remoteTrack.trackPublication.kind === "video" ? (
          <VideoComponent
            key={remoteTrack.trackPublication.trackSid}
            track={remoteTrack.trackPublication.videoTrack!}
            participantIdentity={remoteTrack.participantIdentity}
            color={colors[index++]}
            classNameCss="video-container"
          />
        ) : (
            <></>
          // <AudioComponent
          //   key={remoteTrack.trackPublication.trackSid}
          //   track={remoteTrack.trackPublication.audioTrack!}
          // />
        )
      )}
    </div>
  );
};

export default User;
