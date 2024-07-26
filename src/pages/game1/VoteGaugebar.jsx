import "./Gaugebar.css";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";

import gsap from "gsap";

const VoteGaugebar = ({ gameStart, setGameStart }) => {
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const { setVotePageShowGameOver } = useCatchLiarStore();

  const tensionSound = new Audio("/sound_effects/tension_sound.mp3");
  useEffect(() => {
    setTimeout(() => {
      tensionSound.loop = true;
      tensionSound.play();
      setTimeout(() => {
        tensionSound.pause();
      }, 7000);
    }, 33000);
  }, []);

  useEffect(() => {
    if (gameStart) {
      gsap.to(".loader", {
        width: "99.9%",
        backgroundColor: "red",
        duration: 40,
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
    setVotePageShowGameOver(true);

    setTimeout(() => {
      endVoteSound.pause();
      navigate(`/game1/result`);
      setVotePageShowGameOver(false);
    }, 3000);
  };

  return (
    <div className={`gaugebar ${gameStart ? "start" : ""}`}>

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
