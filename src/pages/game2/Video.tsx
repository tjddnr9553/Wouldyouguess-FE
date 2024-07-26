import "./Video.css";

import React, { useState } from "react";
import { useEffect, useRef } from "react";

import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";

import useCatchLiarStore from "../../store/game/useCatchLiarStore";

import { gsap, Power1 } from "gsap";
import useUserStore from "../../store/user/useUserStore";
import { catchLiar_result } from "../../api/game/CatchLiar";
import { unwatchFile } from "fs";

interface VideoComponentProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  color: string;
  classNameCss: string;
  username: string;
  isSpy: Boolean;
  isWinner: Boolean;
}

function Video({
  track,
  participantIdentity,
  color,
  classNameCss,
  username,
  isSpy,
  isWinner,
}: VideoComponentProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const { thisTurnUserId, isVotePage } = useCatchLiarStore();
  const { userId } = useUserStore();
  const { gameId ,setIsVotePage } = useCatchLiarStore();



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
    const delay = 1.5;
    const id = "camera-" + participantIdentity;
    floatingObj(id, delay);

    if (isWinner === false && isWinner !== null) {
        gsap.to('.loser', {
          duration: 1,
          delay: 3.5,
          x: 1000,
          y: -300,
          rotateX: 360,
          rotationY: 360,
          rotationZ: 360,
          opacity: 0,
          ease: "pwer1.easeInOut"
        })
    }
    // if (isWinner === true && isWinner !== null) {
    //   gsap.to(".winner", {
    //     duration: 1,    
    //     delay: 2.5,  
    //     top: "-10%",           // Y축으로 50% 이동
    //     left: "15%",          // X축으로 50% 이동
    //     transform: "translate(50%, 50%)", // 가운데 정렬
    //     ease: "power1.inOut" // 애니메이션의 easing 함수
    //   });
    // }
  }, [isWinner])



  return (
    <div id={"camera-" + participantIdentity} className={`${classNameCss ? classNameCss : ''} ${isWinner && isWinner ? 'winner' : 'loser'}`}
    style={{position: 'relative'}}>
      <div className="ufo-nick">
        {username &&
          (isSpy ?
            `Spy ${username}`:
            `Player ${username}`)
        }
      </div>
      <img src="/images/game/game1/ufo-body.png" className="ufo-body"/>
      {isVotePage && <video ref={videoElement} id={track.sid} />}
    </div>
  );
}

export default Video;
