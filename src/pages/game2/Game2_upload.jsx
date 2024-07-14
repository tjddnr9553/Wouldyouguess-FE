import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User.tsx";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useGameStore from "../../store/game/useGameStore.js";
import {findDiff_gen, findDiff_inpaint, findDiff_og, findDiff_upload} from "../../api/game/FindDiff.js";
import Canvas from "./canvas/Canvas.jsx";
import ImgResizer from "./ImgResizer.js";

const Game2_upload = () => {
  const imgSelectBtn = useRef(null);
  const containerWrapper = useRef(null);
  const uploadImgRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [imgFile, setImgFile] = useState(null);
  const [containerWrapperHeight, setcontainerWrapperHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const [uploadForm, setUploadForm] = useState(null);
  const [inpaintForm, setInpaintForm] = useState(null);
  const [clickSendBtn, setClickSendBtn] = useState(false);

  const { findDiffGameId } = useGameStore();
  const { roomId } = useRoomStore();
  const { setOriginalImages, setGeneratedImages } = useImagesStore();
  const { userId } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    setcontainerWrapperHeight(containerWrapper.current.clientHeight);
  }, [])

  useEffect(() => {
    if(imgFile) {
      prepareFormData(imgFile);
    }
  }, [canvasWidth])

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

  const createImgEl = (event) => {
    const file = event.target.files[0];
    setImgFile(file);

    if (file) {
      setIsImgUploaded(true);

      const imageUrl = URL.createObjectURL(file);
      
      uploadImgRef.current.src = imageUrl;

      uploadImgRef.current.onload = () => {
        setCanvasWidth(uploadImgRef.current.clientWidth);
        canvasContainerRef.current.style.border = '5px solid red';
      }

      return () => {
        URL.revokeObjectURL(imageUrl);
        console.log("이미지 URL 삭제");
      };
    } 
  }

  const prepareFormData = async (file) => {
    const resizingImg = await ImgResizer(file, canvasWidth, containerWrapperHeight);

    // 확인용
    console.log("Image URL:", resizingImg);
    
    const uploadForm = new FormData();
    const inpaintForm = new FormData();

    inpaintForm.append("image", resizingImg);
    inpaintForm.append("roomId", roomId);
    inpaintForm.append("userId", userId);
    inpaintForm.append("prompt", "Modify safely.");

    uploadForm.append("image", resizingImg);
    uploadForm.append("roomId", roomId);
    uploadForm.append("userId", userId);

    setInpaintForm(inpaintForm);
    setUploadForm(uploadForm);
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
                {isImgUploaded === false ? (
                  <strong>Upload Your Image !</strong>
                ) : (
                  <strong>Select your masking area</strong>
                )}
              </div>
            </div>
            <div className="imageContainer">
              <div className="containerWrapper" ref={containerWrapper}>
                <div 
                  className="game2-canvas-container"
                  ref={canvasContainerRef}
                >
                  <img ref={uploadImgRef} src="" id="upload-img" style={{height: containerWrapperHeight}}/>
                  <Canvas 
                    width={isImgUploaded? canvasWidth : 0}
                    height={containerWrapperHeight}
                    inpaintForm={inpaintForm}
                    setInpaintForm={setInpaintForm}
                  />
                </div>
              </div>
              <div className="imageBtnContainer">
                <input
                  type="file"
                  id="imageFile"
                  ref={imgSelectBtn}
                  onChange={createImgEl}
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