import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User.tsx";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useGameStore, { useCanvasStore, useFileStore } from "../../store/game/useGameStore.js";
import Canvas from "./canvas/Canvas.jsx";
import ImgResizer from "./ImgResizer.js"
import useAudioStore from "../../store/bgm/useAudioStore";
import {
  findDiff_gen,
  findDiff_inpaint,
  findDiff_og,
  findDiff_upload,
} from "../../api/game/FindDiff.js";

const Game2_upload = () => {
  const { isImgUploaded, x, y, isMaskingComplete} = useCanvasStore();
  const {file, setFile, uploadForm, updateUploadForm, inpaintForm, updateInpaintForm} = useFileStore();
  const {clickSendBtn, setClickSendBtn, findDiffGameId} = useGameStore();
  const imgSelectBtn = useRef(null);

  const { roomId } = useRoomStore();
  const { setOriginalImages, setGeneratedImages } = useImagesStore();
  const { userId } = useUserStore();
  const { play, stop } = useAudioStore();
  const navigate = useNavigate();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3"); // 게임2 시작 시 음악 재생

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    if(isMaskingComplete) {
      sendToServer();
    }
  }, [isMaskingComplete])

  const sendToServer = async () => {
    console.log("uploadForm ", uploadForm.get('image'));
    console.log("inpaintForm ", inpaintForm.get('image'));

    updateForm();

    console.log("Updated mask coordinates:", {
      maskX1: inpaintForm.get('maskX1'),
      maskY1: inpaintForm.get('maskY1'),
      maskX2: inpaintForm.get('maskX2'),
      maskY2: inpaintForm.get('maskY2'),
    });
    console.log('prompt', inpaintForm.get('prompt'));

    setClickSendBtn(true);

    // navigate("/game2")
    
    const uploadRes = await findDiff_upload(uploadForm);
    if (uploadRes.status === 200) {
      console.log("서버로 원본 이미지 전송 성공");
      
      const response = await findDiff_og(findDiffGameId, userId);
      if (response.status === 200) {
        setOriginalImages(response.data); // 여기서는 URL만 포함된 배열을 받습니다.
      }

      navigate("/game2/remember/");

      setTimeout(async () => {
        await findDiff_inpaint(inpaintForm);
        const genResponse = await findDiff_gen(findDiffGameId, userId);
        setGeneratedImages(genResponse.data);
      }, 0);
    }
  };

  const prepareFormData = async (file) => {
    const resizingImg = await ImgResizer(file, 512, 512); // 512 변경 필요
    // console.log(resizingImg);
    setFile(resizingImg);

    updateInpaintForm("roomId", roomId);
    updateInpaintForm("userId", userId);
    updateInpaintForm("prompt", "Modify safely.");

    updateUploadForm("roomId", roomId);
    updateUploadForm("userId", userId);
  };

  const updateForm = () => {
    const length = 100;
    
    const maskX1 = (x - length / 2)> 0 ? Math.round(x - length / 2) : 0;
    const maskY1 = (y - length / 2) > 0 ? Math.round(y - length / 2) : 0;
    const maskX2 = Math.round(x + length / 2);
    const maskY2 = Math.round(y + length / 2);

    // 새로운 마스킹 좌표 설정
    updateInpaintForm("maskX1", maskX1);
    updateInpaintForm("maskY1", maskY1);
    updateInpaintForm("maskX2", maskX2);
    updateInpaintForm("maskY2", maskY2);
  }

  const changeInput = (e) => {
    prepareFormData(e.target.files[0]);
  }

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
                {isImgUploaded === false ? (
                  <strong>Upload Your Image !</strong>
                ) : (
                  <strong>Select your masking area</strong>
                )}
              </div>
            </div>
            <div className="imageContainer">
              <div className="containerWrapper">
                <div className="game2-canvas-container">
                  <Canvas />
                </div>
              </div>
              <div className="imageBtnContainer">
                <input
                  type="file"
                  id="imageFile"
                  ref={imgSelectBtn}
                  onChange={changeInput}
                  accept="image/png"
                  style={{ display: "none" }}
                />
                {isImgUploaded === false ? (
                  <NewButton
                    text={"Image Upload"}
                    onClick={() => {
                      imgSelectBtn.current.click();
                    }}
                  />
                ) : (
                  <NewButton
                    text={"전송하기"}
                    onClick={() => {
                      setClickSendBtn(true);
                    }}
                    disabled={clickSendBtn}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2_upload;