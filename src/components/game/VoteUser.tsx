import React, { useEffect, useState } from "react";
import Video from "../../pages/game2/Video";
import AudioComponent from "../webrtc/AudioComponent";
import useUserStore from "../../store/user/useUserStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

const VoteUser = ({ targetId }) => {
  const { userId } = useUserStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  let i = 0;

  useEffect(() => {
    i = 0;
  }, [targetId]);

  const targetIdArrayNumber = Array.isArray(targetId) ? targetId : [targetId];
  const targetIdArrayString = Array.isArray(targetId)
    ? targetId.map(String)
    : [String(targetId)];

  return (
    <div
      className="voteUser-layout-container"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      {
        // localTrack은 targetIdArray 배열에 userId가 포함될 때만 렌더링
         localTrack && (
          <Video
            track={localTrack}
            participantIdentity={userId}
            color=""
            classNameCss="video-container"
          />
        )
      }
      {remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
           (
            <Video
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
              color={''}
              classNameCss="video-container"
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
