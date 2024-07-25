import "./VideoComponent.css";

import React from "react";
import { useEffect, useRef } from "react";

import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";

import useCatchLiarStore from "../../store/game/useCatchLiarStore";

interface VideoComponentProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  color: string;
  classNameCss: string;
}

function VideoComponent({
  track,
  participantIdentity,
  color,
  classNameCss,
}: VideoComponentProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const { thisTurnUserId } = useCatchLiarStore();

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.style.borderRadius = "inherit";
      videoElement.current.style.boxShadow = `0 0 10px 10px ${color}`;
      if (thisTurnUserId !== 0) {
        videoElement.current.style.width = Number(participantIdentity) === thisTurnUserId  ? "100%" : "70%";
      }
      track.attach(videoElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track, thisTurnUserId]);

  return (
    <div id={"camera-" + participantIdentity} className={classNameCss && classNameCss}>
      <video ref={videoElement} id={track.sid} />
    </div>
  );
}

export default VideoComponent;
