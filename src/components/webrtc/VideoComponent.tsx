import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import "./VideoComponent.css";
import { useEffect, useRef } from "react";
import React from "react";

interface VideoComponentProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  color: string;
  local: boolean;
}

function VideoComponent({
  track,
  participantIdentity,
  color,
  local,
}: VideoComponentProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.style.borderRadius = "inherit";
      videoElement.current.style.boxShadow = `0 0 10px 10px ${color}`;
      track.attach(videoElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return (
    <div id={"camera-" + participantIdentity} className="video-container">
      <video ref={videoElement} id={track.sid}></video>
    </div>
  );
}

export default VideoComponent;
