import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User.tsx";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useGameStore from "../../store/game/useGameStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import {
  findDiff_gen,
  findDiff_inpaint,
  findDiff_og,
  findDiff_upload,
} from "../../api/game/FindDiff.js";
import Game2_Music from "../../components/bgm/Game2_Music.jsx";

const Game2_upload = () => {
  const imgSelctBtn = useRef(null);
  const previewImage = useRef(null);
  const canvasRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadForm, setUploadForm] = useState(null);
  const [inpaintForm, setInpaintForm] = useState(null);
  const [clickSendBtn, setClickSendBtn] = useState(false);
  const [clickUploadBtn, setClickUploadBtn] = useState(false);

  const [previewImageWidth, setPreviewImageWidth] = useState(0);
  const [previewImageHeight, setPreviewImageHeight] = useState(0);

  const { findDiffGameId } = useGameStore();
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
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      previewImage.current.style.backgroundImage = `url(${imageUrl})`;
      setClickUploadBtn(true);

      return () => {
        URL.revokeObjectURL(imageUrl);
        console.log("이미지 URL 삭제");
      };
    } else {
      previewImage.current.style.backgroundImage = "";
    }
  }, [selectedImage]);

  useEffect(() => {
    if (previewImage.current) {
      setPreviewImageWidth(previewImage.current.clientWidth);
      setPreviewImageHeight(previewImage.current.clientHeight);
    }
  }, [selectedImage]);

  const sendToServer = async () => {
    setClickSendBtn(true);

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

  const selectImage = (event) => {
    const file = event.target.files[0];
    const uploadForm = new FormData();
    const inpaintForm = new FormData();

    setSelectedImage(file);

    inpaintForm.append("image", file);
    inpaintForm.append("roomId", roomId);
    inpaintForm.append("userId", userId);
    inpaintForm.append("prompt", "Modify safely.");

    uploadForm.append("image", file);
    uploadForm.append("roomId", roomId);
    uploadForm.append("userId", userId);

    setInpaintForm(inpaintForm);
    setUploadForm(uploadForm);
  };

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const clickCanvas = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, previewImageWidth, previewImageHeight);
    const { x, y } = getCursorPosition(e);

    const length = 100;
    context.strokeRect(x - length / 2, y - length / 2, length, length);

    // 마스킹 영역 업데이트
    const updatedInpaintForm = new FormData();

    // 기존 inpaintForm의 모든 데이터를 새 FormData 객체에 복사
    for (let [key, value] of inpaintForm.entries()) {
      updatedInpaintForm.append(key, value);
    }

    // 새로운 마스킹 좌표 설정
    updatedInpaintForm.set("maskX1", Math.round(x - length / 2));
    updatedInpaintForm.set("maskY1", Math.round(y - length / 2));
    updatedInpaintForm.set("maskX2", Math.round(x + length / 2));
    updatedInpaintForm.set("maskY2", Math.round(y + length / 2));

    console.log("Updated mask coordinates:", {
      maskX1: Math.round(x - length / 2),
      maskY1: Math.round(y - length / 2),
      maskX2: Math.round(x + length / 2),
      maskY2: Math.round(y + length / 2),
    });

    setInpaintForm(updatedInpaintForm);
  };

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
                {clickUploadBtn === false ? (
                  <strong>Upload Your Image !</strong>
                ) : (
                  <strong>Select your masking area</strong>
                )}
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage" ref={previewImage}>
                {selectedImage && (
                  <canvas
                    ref={canvasRef}
                    width={previewImageWidth}
                    height={previewImageHeight}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "transparent",
                    }}
                    onMouseDown={clickCanvas}
                  />
                )}
              </div>
              <div className="imageBtnContainer">
                <input
                  type="file"
                  id="imageFile"
                  ref={imgSelctBtn}
                  onChange={selectImage}
                  accept="image/png"
                  style={{ display: "none" }}
                />
                {clickUploadBtn === false ? (
                  <NewButton
                    text={"Image Upload"}
                    onClick={() => imgSelctBtn.current.click()}
                  />
                ) : (
                  <NewButton
                    text={"전송하기"}
                    onClick={sendToServer}
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
