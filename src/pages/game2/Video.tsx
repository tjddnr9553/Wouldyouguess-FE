import "./Video.css";

import React from "react";
import { useEffect, useRef } from "react";

import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";

import useCatchLiarStore from "../../store/game/useCatchLiarStore";

import { gsap, Power1 } from "gsap";

interface VideoComponentProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  color: string;
  classNameCss: string;
}

function Video({
  track,
  participantIdentity,
  color,
  classNameCss,
}: VideoComponentProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const { thisTurnUserId, isVotePage } = useCatchLiarStore();

  useEffect(() => {
    if (videoElement.current) {
      if (!isVotePage) {
        videoElement.current.style.borderRadius = "inherit";
        videoElement.current.style.boxShadow = `0 0 10px 10px ${color}`;
      }
      if (thisTurnUserId !== 0) {
        videoElement.current.style.width = Number(participantIdentity) === thisTurnUserId  ? "100%" : "70%";
      }
      track.attach(videoElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track, thisTurnUserId]);

  const random = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  };

  const floatingObj = (selector, delay) => {
    gsap.to("#" + selector, {
      duration: random(1.5, 3.5),
      delay: random(0, delay),
      x: 100, // X축 움직임 추가
      y: 200,
      repeat: -1,
      yoyo: true,
      ease: "Power1.easeInOut",
      modifiers: {
        x: (x) => `${Math.sin(parseFloat(x) / 10) * 70}px`, // 지그재그 효과 추가
        y: (y) => `${parseFloat(y)}px`
      }
    });
  };

  useEffect(() => {
    const delay = 5;
    const id = "camera-" + participantIdentity;
    floatingObj(id, delay);
  }, [])

  return (
    <div id={"camera-" + participantIdentity} className={classNameCss && classNameCss} style={{position: 'relative'}}>
      <div></div>
      <img src="/images/game/game1/ufo-body.png" className="ufo-body"/>
      {isVotePage && <video ref={videoElement} id={track.sid} />}
    </div>
  );
}

export default Video;
