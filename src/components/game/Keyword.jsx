import { useEffect, useRef } from "react";
import "./Keyword.css";
import KeywordText from "./KeywordText";

const Keyword = ({ keyword }) => {
  const spaceshipTextRef = useRef(null);

  useEffect(() => {
    if (spaceshipTextRef.current) {

      spaceshipTextRef.current.style.display = "none";
      const timer = setTimeout(() => {
        console.log('2', spaceshipTextRef.current);

        spaceshipTextRef.current.style.display = "block";
      }, 3500);
      
      return () => clearTimeout(timer);
    }

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
      <div id="keyword-text-container">
        <div className="spaceship_text" ref={spaceshipTextRef}>
          <KeywordText text={keyword} />
        </div>
      </div>
    </div>
  );
};
export default Keyword;
