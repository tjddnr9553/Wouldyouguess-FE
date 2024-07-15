import "./Vote.css";
import { useEffect, useRef } from "react";
import User from "../../components/game/User";
import useAudioStore from "../../store/bgm/useAudioStore";

const dummyImg = [
  {
    userID: 1,
    path: "/images/characters/1.png",
  },
  {
    userID: 2,
    path: "/images/characters/2.png",
  },
  {
    userID: 3,
    path: "/images/characters/3.png",
  },
  {
    userID: 4,
    path: "/images/characters/1.png",
  },
];

const Result1 = () => {
  const previewImage = useRef(null);

  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game1_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  return (
    <div className="inner">
      <div className="game container">
        <div className="left-section">
          <User />
        </div>
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Vote</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDiffrence" ref={previewImage}>
                {dummyImg.map((img, index) => (
                  <div key={img.userID} className="user-painting">
                    <div id={`image${index}`} className="img-border">
                      <img src={img.path} alt={`${img.userID} image`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result1;
