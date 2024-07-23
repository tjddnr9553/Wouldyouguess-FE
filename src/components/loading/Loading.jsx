import "./Loading.css";
import Star from "../background/Star";
import useSocketStore from "../../store/socket/useSocketStore.js";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loading = () => {
  const location = useLocation();
  const { title } = location.state || {};

  const navigate = useNavigate();
  const { socket } = useSocketStore();
  const loadingSound = new Audio("/sound_effects/loading_sound.mp3");

  useEffect(() => {
    socket?.on("game_loading", (data) => {
      navigate(data.nextPageUrl);
    });
    
    loadingSound.loop = true;
    loadingSound.play();

    return () => {
      loadingSound.pause();
      loadingSound.currentTime = 0;
      socket?.off("game_loading", (data) => {
        navigate(data.nextPageUrl);
      });
    };
  }, [socket]);

  return (
    <>
      <Star />
      <div className="loading content">
        <div className="loading-title">{title}</div>
        {/*<div className="loading-title">파일 업로드 중 입니다.</div>*/}
        <div data-js="astro" className="astronaut">
          <div className="head"></div>
          <div className="arm arm-left"></div>
          <div className="arm arm-right"></div>
          <div className="body">
            <div className="panel"></div>
          </div>
          <div className="leg leg-left"></div>
          <div className="leg leg-right"></div>
          <div className="schoolbag"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
