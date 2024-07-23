import GameOver from "./GameOver";
import "./Gaugebar.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const VoteGaugebar = ({ gameStart, setGameStart }) => {
  const navigate = useNavigate();
  const loaderRef = useRef(null);
  const [showGameover, setShowGameover] = useState(false);

  const tensionSound = new Audio("/sound_effects/tension_sound.mp3");
  useEffect(() => {
    setTimeout(() => {
      tensionSound.loop = true;
      tensionSound.play();
      setTimeout(() => {
        tensionSound.pause();
      }, 7000);
    }, 13000);
  }, []);

  useEffect(() => {
    if (gameStart) {
      gsap.to(".loader", {
        width: "99.9%",
        backgroundColor: "red",
        duration: 20,
        ease:"none",
        onComplete: () => {
          handleCountdownComplete();
          setGameStart(false);
        },
      });
    } else {
      gsap.killTweensOf(".loader");
    }
  }, [gameStart]);

  const handleCountdownComplete = async () => {
    const endVoteSound = new Audio("/sound_effects/end_vote.mp3");
    endVoteSound.loop = true;
    endVoteSound.play();
    setShowGameover(true);

    setTimeout(() => {
      endVoteSound.pause();
      navigate(`/game1/result`);
      setShowGameover(false);
    }, 3000);
  };

  return (
    <div className={`gaugebar ${gameStart ? "start" : ""}`}>
      {showGameover && <GameOver />}
      <div className={`loader ${gameStart ? "start" : ""}`} ref={loaderRef}>
        <img
          src="/images/game/rocket.svg"
          className={`rocket ${gameStart ? "start" : ""}`}
        />
      </div>
    </div>
  );
};

export default VoteGaugebar;
