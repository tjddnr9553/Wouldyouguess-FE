import React, { useEffect, useState } from "react";
import VideoComponent from "../webrtc/VideoComponent";
import AudioComponent from "../webrtc/AudioComponent";
import useUserStore from "../../store/user/useUserStore";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore";

const VoteUser = ({ targetId }) => {
  const { userId } = useUserStore();
  const { localTrack, remoteTracks } = useWebrtcStore();

  const colors = ["blue", "purple", "green"];
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
        targetIdArrayNumber.includes(userId) && localTrack && (
          <VideoComponent
            track={localTrack}
            participantIdentity={userId}
            color="red"
            local={true}
          />
        )
      }
      {remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
          targetIdArrayString.includes(remoteTrack.participantIdentity) && (
            <VideoComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
              color={colors[i++]}
              local={false}
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
