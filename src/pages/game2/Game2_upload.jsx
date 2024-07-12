import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useGameStore from "../../store/game/useGameStore.js";
import { Rectangle } from "../game1/canvas/tools"

const Game2_upload = () => {
  const imgSelctBtn = useRef(null);
  const previewImage = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadForm, setUploadForm] = useState(null);
  const [inpaintForm, setInpaintForm] = useState(null);
  const [clickSendBtn, setClickSendBtn] = useState(false);
  const [clickUploadBtn, setClickUploadBtn] = useState(false);
  
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const toolRef = useRef(null); 
  let isClick = false;
  const [previewImageWidth, setpreviewImageWidth] = useState(0);
  const [previewImageHeight,setpreviewImageHeight] = useState(0);

  const { findDiffGameId } = useGameStore();
  const { roomId } = useRoomStore();
  const { setOriginalImages, setGeneratedImages } = useImagesStore();
  const { userId } = useUserStore();

  const navigate = useNavigate();

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

  const sendToServer = async () => {
    setClickSendBtn(true);

    try {
      // 1. 원본 이미지 업로드
      const uploadRes = await axios.post(
        "http://localhost:8080/api/findDiff/upload",
        uploadForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadRes.status === 200) {
        console.log("서버로 원본 이미지 전송 성공");

        // 2. 원본 이미지 가져오기
        const response = await axios.get(
          `http://localhost:8080/api/findDiff/og/${findDiffGameId}/${userId}`
        );

        if (response.status === 200) {
          setOriginalImages(response.data.map((item) => item.path));
        }

        // 다음 페이지로 이동
        navigate("/game2/remember/"); // 실제 다음 페이지 경로로 변경해주세요

        // 백그라운드에서 나머지 요청 실행
        setTimeout(async () => {
          try {
            // 3. 인페인팅 요청
            await axios.post(
              "http://localhost:8080/api/findDiff/inpaint",
              inpaintForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("인페인팅 요청 성공");

            // 4. 생성된 이미지 가져오기
            const genResponse = await axios.get(
              `http://localhost:8080/api/findDiff/gen/${findDiffGameId}/${userId}`
            );
            const generatedImages = genResponse.data.map((item) => item.path);
            setGeneratedImages(generatedImages);
            console.log("Updated generatedImages:", generatedImages);
          } catch (error) {
            console.error("백그라운드 작업 중 오류 발생:", error);
          }
        }, 0);
      }
    } catch (error) {
      console.error("이미지 처리 중 오류 발생:", error);
      // 에러 처리 로직 (예: 에러 페이지로 이동)
      // navigate('/error');
    }
  };

  const selectImage = (event) => {
    const file = event.target.files[0];
    const uploadForm = new FormData();
    const inpaintForm = new FormData();

    setSelectedImage(file);

    inpaintForm.append("image", file);
    inpaintForm.append("mask_x1", 200);
    inpaintForm.append("mask_y1", 200);
    inpaintForm.append("mask_x2", 600);
    inpaintForm.append("mask_y2", 600);
    inpaintForm.append("roomId", roomId);
    inpaintForm.append("userId", userId);
    inpaintForm.append("prompt", "Modify safely.");

    uploadForm.append("image", file);
    uploadForm.append("roomId", roomId);
    uploadForm.append("userId", userId);

    setInpaintForm(inpaintForm);
    setUploadForm(uploadForm);
  };

  /* 그림판 관련 함수 */
  useEffect(() => {
    setpreviewImageWidth(previewImage.current.clientWidth);
    setpreviewImageHeight(previewImage.current.clientHeight);

    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext('2d');
    toolRef.current = Rectangle(ctxRef.current);
  }, [])

  const getCursorPosition = (e) => {
    const {top, left} = canvasRef.current.getBoundingClientRect();
    return {
        x: e.clientX - left,
        y: e.clientY - top
    }
  }

  const onMouseDown = (e) => {
    if (!clickUploadBtn) return;
    isClick = true;
    ctxRef.current.clearRect(0, 0, previewImageWidth, previewImageHeight);
    const {x, y} = getCursorPosition(e);
    toolRef.current.onMouseDown(x, y, "black", 5, '');
  }

  const onMouseUp = (e) => {
    isClick = false; 
    const {x, y} = getCursorPosition(e);
    toolRef.current.onMouseUp(x, y);
  }

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
                {clickUploadBtn === false ? (
                  <strong>Upload Your Image !</strong>
                ) : (
                  <strong>select your masking area</strong>
                )}
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage" ref={previewImage}>
                <canvas 
                  ref={canvasRef}
                  width={previewImageWidth}
                  height={previewImageHeight}
                  style={{ backgroundColor: 'transparent' }}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                />
              </div>
              <div className="imageBtnContainer">
                <input
                  type="file"
                  id="imageFile"
                  ref={imgSelctBtn}
                  onChange={selectImage}
                  accept="image/png"
                  style={{ display: "none" }}
                  multiple
                />
                {clickUploadBtn === false ? (
                  <NewButton
                    text={"Image Upload"}
                    onClick={() => {
                      imgSelctBtn.current.click();
                    }}
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
