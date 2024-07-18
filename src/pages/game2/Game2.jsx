import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import NewButton from "../../components/button/newButton";
import useAudioStore from "../../store/bgm/useAudioStore";
import "./Game2.css";
import "swiper/css";
import FDGCanvas from "./canvas/FDGCanvas.jsx";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import useFDGCanvasStore from "../../store/game/findDiffGame/useFDGCanvasStore.js";
import {findDiff_generated_images} from "../../api/game/FindDiff.js";
import useUserStore from "../../store/user/useUserStore.js";
import useFDGFileStore from "../../store/game/findDiffGame/useFDGFileStore.js";

const Game2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get("round"));

  const generatedImgRef = useRef(null);

  const [generatedImage, setGeneratedImage] = useState(null);
  const [chance, setChance] = useState(3);
  const [roundLength, setRoundLength] = useState(0);

  const { userId } = useUserStore();
  const { x, y, canvasClick } = useFDGCanvasStore();
  const { setUploadFile } = useFDGFileStore();
  const { findDiffGameId } = useFDGStore();

  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");
    return () => {
      stop();
    };
  }, [])

  useEffect(() => {
    const sync_func = async () => {
        const res = await findDiff_generated_images(findDiffGameId, userId);
        setGeneratedImage(res[round - 1]);
        setRoundLength(res.length);
    }

    sync_func();
  }, [round]);

  useEffect(() => {
    if(!generatedImage) return;

    setUploadFile(generatedImage.generatedUrl);
  }, [generatedImage])

  useEffect(() => {
    if (canvasClick) {
      checkAnswerAndCondition();
    }
  }, [canvasClick])

  const checkAnswerAndCondition = () => {

    // 정답
    const maskX1 = generatedImage.maskX1;
    const maskY1 = generatedImage.maskY1;
    const maskX2 = generatedImage.maskX2;
    const maskY2 = generatedImage.maskY2;
    console.log(maskX1, maskX2, maskY1, maskY2);
    console.log(x, y)

    console.log(roundLength);
    if (maskX1 <= x && x <= maskX2 && maskY1 <= y && y <= maskY2) {
      round === roundLength ? navigate(`/game2/result`) : navigate(`/game2?round=${round + 1}`);
    } else {
      setChance(chance - 1);
      if (chance === 0) {
        round === roundLength ? navigate(`/game2/result`) : navigate(`/game2?round=${round + 1}`);
      }
    }

  }
  

  return (
    <div className="inner">
      <div className="game2 container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Find Difference !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="findDifference containerWrapper" >
                <div className="generatedImg game2-canvas-container" ref={generatedImgRef} >
                  <FDGCanvas />
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2;
