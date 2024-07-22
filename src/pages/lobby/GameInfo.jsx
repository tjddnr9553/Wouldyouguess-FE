import React from "react";
import "./GameInfo.css";

const GameInfo = ({ mode, onclick, title, discription }) => {
  return (
    <div className="info-container">
      <section className="augs bg" data-augmented-ui>
        <button className="dots" onClick={onclick}></button>
        <input className="gameInfo-title" defaultValue={mode} />
      </section>
      <section>
        {mode === "Catch Spy" && (
          <img src="/images/gameInfo/1-1.png" id="gameInfo-image1-1" />
        )}
        {mode === "Find Difference" && (
          <img src="/images/gameInfo/2-1.png" id="gameInfo-image2-1" />
        )}
        <p className="gameInfo-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Layer_1"
            width="50px"
            height="50px"
            viewBox="0 0 512 512"
            enable-background="new 0 0 512 512"
            xml:space="preserve"
          >
            <path
              fill="#EA4335"
              d="M59.683,93.365L452.317,256L59.683,418.635L141,256L59.683,93.365z"
            />
          </svg>
        </p>
        {mode === "Catch Spy" && (
          <img src="/images/gameInfo/1-2.png" id="gameInfo-image1-2" />
        )}
        {mode === "Find Difference" && (
          <img src="/images/gameInfo/2-2.png" id="gameInfo-image2-2" />
        )}
      </section>
      <section className="game-instructions">
        <div className="instruction-text">
          <div>
            {" "}
            <strong>{title}</strong>
          </div>
          <br />
          {discription}
        </div>
      </section>
      <input className="sig" value={mode} />
      <div className="glow-container">
        <div className="augs" data-augmented-ui></div>
      </div>
      <div className="info-container::after"></div>{" "}
    </div>
  );
};

export default GameInfo;
