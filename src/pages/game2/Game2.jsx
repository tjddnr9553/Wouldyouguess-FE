
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import NewButton from "../../components/button/newButton";
import axios from "axios";
import User from "../../components/game/User";
import useImagesStore from "../../store/image/useImagesStore";
import useRoomStore from "../../store/room/useRoomStore";
import useAudioStore from "../../store/bgm/useAudioStore";

import "./Game2.css";
import "swiper/css";
import Canvas from "./canvas/Canvas";
import useGameStore, { useCanvasStore, useFileStore }  from "../../store/game/useGameStore";

const STATUS = {
  START: 'start',
  SUCCESS: 'success', // round 성공
  FAIL: 'fail', // 기회 세 번 모두 사용
  END: 'end' // 시간 초과
};

const Game2 = () => {
  const navigate = useNavigate();

  const {x, y} = useCanvasStore();
  const {round,  setNextRound, remainingTime, setRemainingTime, correctCount, setCorrectCount, 
        setRemainingChance, chance, setChance, mode, setMode} = useGameStore();

  const { generatedImages } = useImagesStore();
  const {inpaintForm, uploadForm} = useFileStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [gameState, setGameState] = useState(STATUS.START);
  
  const generatedImg = useRef(null);

  const timeLimit = 60000;
  
  useEffect(() => {
    setMode('difference');
    
    setTimeout(() => { 
      navigate("/game2/result");
    }, timeLimit);
  }, [])
  
  // 캔버스 좌표 값 변경 시 정답 확인
  useEffect(() => {
    if (mode === 'difference') {
      checkAnswerAndCondition();
    }
  }, [x, y])

  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    nextImage();
  }, [gameState])
  
  const checkAnswerAndCondition = () => {
    const maskX1 = generatedImages[round].maskX1;
    const maskY1 = generatedImages[round].maskY1;
    const maskX2 = generatedImages[round].maskX2;
    const maskY2 = generatedImages[round].maskY2;

    // 테스트용
    // const maskX1 = inpaintForm.get('maskX1');
    // const maskY1 = inpaintForm.get('maskY1');
    // const maskX2 = inpaintForm.get('maskX2');
    // const maskY2 = inpaintForm.get('maskY2');

    console.log('x ', x, 'y ', y);

    if (maskX1 <= x && x <= maskX2 && maskY1 <= y && y <= maskY2) {
      alert('성공');
      
      // 점수 계산을 위해 셋팅
      setRemainingChance(`round${round}`, chance);
      setCorrectCount();
      showScore();

      // 다음 라운드를 위해 chance 초기화
      setChance(3);

      // 게임 상태 return
      return STATUS.SUCCESS;
    } else {
      alert(`실패 남은 기회 : ${chance - 1}`);
      setChance(chance - 1);

      if (chance - 1 <= 0) {
        alert('기회 끝');
        setRemainingChance(`round${round}`, chance);
        setChance(3);

        return STATUS.FAIL;
      }
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

  // x 초마다 이미지 전환
  // 조건이 만족되면 즉시 다음 이미지로 전환
  const nextImage = () => {   
    if (currentImageIndex < generatedImages.length) {
      console.log(generatedImages[currentImageIndex].generatedUrl);
      generatedImg.current.style.backgroundImage = `url(${generatedImages[currentImageIndex].generatedUrl})`;
      // generatedImg.current.style.backgroundImage = `url(${uploadForm.get('image')})`;

      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      setNextRound();
    }
  }


  // 다음 라운드로 넘어가는 함수. x 초마다 무조건 실행.
    // 다음 이미지를 보여주고 , 라운드 갱신.
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(STATUS.END);
    }, 50000);

    return () => clearInterval(interval);
  }, [round]); 

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
                <strong>Find Difference !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDifference containerWrapper" >
                <div className="generatedImg game2-canvas-container" ref={generatedImg} >
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
