import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NewButton from "../../components/button/newButton";
import axios from "axios";
import User from "../../components/game/User";
import useImagesStore from "../../store/image/useImagesStore";
import useRoomStore from "../../store/room/useRoomStore";

import "./Game2.css";
import "swiper/css";
import Canvas from "./canvas/Canvas";
import { useCanvasStore, useFileStore } from "../../store/game/useGameStore";
import useGameStore from "../../store/game/useGameStore";

const Game2 = () => {
  const navigate = useNavigate();

  const {x, y, canvasWrapperWidth, canvasWrapperHeight} =useCanvasStore();
  const {round,  setRound, remainingTime, setRemainingTime, correctCount, setCorrectCount, 
        setRemainingChance, chance, setChance, mode, setMode} = useGameStore();
  const {inpaintForm} = useFileStore();

  const { roomId } = useRoomStore();
  const { generatedImages } = useImagesStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const generatedImg = useRef(null);
  const timeLimit = 60000;

  useEffect(() => {
    setMode('difference');
  }, [])

  useEffect(() => {
    if (mode === 'difference') {
      checkAnswer();
    }
  }, [x, y])

  
  const checkAnswer = () => {
    const maskX1 = inpaintForm.get("maskX1");
    const maskY1 = inpaintForm.get("maskY1");
    const maskX2 = inpaintForm.get("maskX2");
    const maskY2 = inpaintForm.get("maskY2");

    if (maskX1 <= x <= maskX2 && maskY1 <= y <= maskY2) {
      alert('성공');
      setRemainingChance(`round${round}`, chance);
      setCorrectCount();
      setChance(3);
      showScore();
    } else {
      alert(`실패 남은 기회 : ${chance - 1}`);
      setChance(chance - 1);

      if (chance - 1 <= 0) {
        alert('기회 끝');
        setRemainingChance(`round${round}`, chance);
        setChance(3);
      }
    }

    if (round === 3) {
      calculateScore();
    }
  }
  
  const calculateScore = () => {
    // 점수 계산 로직 작성
  }
  
  // 확인용. 나중에 지우기.
  useEffect(() => {
    showScore();
  }, [chance])
  
  const showScore = () => {
    console.log("round ", round);
    console.log("chance ", chance);
    console.log("correctCount ", correctCount);
    console.log("remainingTime ", remainingTime);
  }

  useEffect(() => {
    const showImages = () => {
      if (currentImageIndex < generatedImages.length) {
        generatedImg.current.style.backgroundImage = `url(${generatedImages[currentImageIndex]})`;
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
              <div className="findDifference containerWrapper">
                <div className="generatedImg" ref={generatedImg} style={{backgroundImage: 'url("/images/characters/dummy.jpg")', width: canvasWrapperWidth, height: canvasWrapperHeight, position: 'relative' }}>
                  <Canvas />
                </div>
              </div>
              <div className="magnifierContainer">
                <NewButton
                  text={
                    Array.from({ length: chance }, (_, index) => (
                    <img
                      key={index}
                      src="/images/magnifier.png"
                      style={{ width: "2rem" }}
                    />
                    ))
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
