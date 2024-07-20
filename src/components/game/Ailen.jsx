import { useEffect, useRef } from "react";
import "./Ailen.css";
import AilenText from "./AilenText";

const Ailen = ({ keyword }) => {
  const spaceshipTextRef = useRef(null);
  const sequenceSoundRef = useRef(null);

  useEffect(() => {
    spaceshipTextRef.current.style.display = "none";
    setTimeout(() => {
      sequenceSoundRef.current.volume = 0.4;
      sequenceSoundRef.current.play();
    }, 3000);
    setTimeout(() => {
      spaceshipTextRef.current.style.display = "block";
    }, 3500);
  }, []);

  return (
    <div className="spaceship-container">
      <div className="spaceship">
        <div id="star1"></div>
        <div id="star2"></div>
        <div id="star3"></div>
        <div className="robot">
          <div id="half">
            <div id="brain"></div>
          </div>
          <div id="head">
            <span id="lc"></span>
            <span id="le"></span>
            <span id="re"></span>
            <div id="mouth"></div>
            <span id="rc"></span>
          </div>
          <div id="foot"></div>
          <div id="leg-1"></div>
          <div id="leg-2"></div>
        </div>
        <div className="spaceship_top"></div>
        <div className="spaceship_middle">
          <div className="spaceship_balls_1"></div>
          <div className="spaceship_balls_2"></div>
          <div className="spaceship_balls_3"></div>
          <div className="spaceship_balls_4"></div>
          <div className="spaceship_balls_5"></div>
        </div>
        <div className="spaceship_bottom">
          <div className="abduct_hole1"></div>
          <div className="abduct_hole2"></div>
          <div className="abduct_hole3"></div>
          <div className="abduct_hole4"></div>
          <div className="abduct_hole5"></div>
        </div>
      </div>
      <div id="alien-text-container">
        <div className="spaceship_text" ref={spaceshipTextRef}>
          <audio
            src="/sound_effects/sequence_sound.mp3"
            ref={sequenceSoundRef}
          />
          <AilenText text={keyword} />
        </div>
      </div>
    </div>
  );
};
export default Ailen;
