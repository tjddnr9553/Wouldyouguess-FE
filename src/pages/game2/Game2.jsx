import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NewButton from "../../components/button/newButton";
import axios from "axios";
import User from "../../components/game/User";
import useImagesStore from "../../store/image/useImagesStore";
import useRoomStore from "../../store/room/useRoomStore";

import "./Game2.css";
import "swiper/css";

const Game2 = () => {
  const navigate = useNavigate();
  const { roomId } = useRoomStore();
  const previewImage = useRef(null);
  const { generatedImages } = useImagesStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeLimit = 60000;

  useEffect(() => {
    const showImages = () => {
      if (currentImageIndex < generatedImages.length) {
        previewImage.current.style.backgroundImage = `url(${generatedImages[currentImageIndex]})`;
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setTimeout(showImages, 2000); // 2초마다 다음 이미지로 (이 시간은 조절 가능)
      } else {
        // 모든 이미지를 보여준 후 10초 뒤에 결과 페이지로 이동
        setTimeout(() => {
          navigate("/game2/result");
        }, timeLimit);
      }
    };

    showImages();

    return () => {
      // cleanup 함수: 필요한 경우 타이머를 정리할 수 있습니다.
    };
  }, [generatedImages, navigate]);

  return (
    <div className="inner">
      <div className="game container">
        <div className="left-section">
          <User />
          <User />
          <User />
          <User />
        </div>
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Find Difference !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDifference" ref={previewImage}></div>
              <div className="magnifierContainer">
                <NewButton
                  text={
                    <div>
                      <img
                        src="/images/magnifier.png"
                        style={{ width: "2rem" }}
                      />
                      <img
                        src="/images/magnifier.png"
                        style={{ width: "2rem" }}
                      />
                      <img
                        src="/images/magnifier.png"
                        style={{ width: "2rem" }}
                      />
                    </div>
                  }
                ></NewButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2;
