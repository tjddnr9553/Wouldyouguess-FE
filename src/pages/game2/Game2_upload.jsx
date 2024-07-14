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
import ImgResizer from "./ImgResizer.js";
import CanvasContainer from "./canvas/CanvasContainer.jsx";
import { useCanvasStore, useFileStore } from "../../store/game/useGameStore.js";

const Game2_upload = () => {
  const {canvasWrapperHeight, canvasWrapperWidth, isImgUploaded, x, y} = useCanvasStore();
  const {file, setFile, uploadForm, setUploadForm, inpaintForm, setInpaintForm} = useFileStore();

  const imgSelectBtn = useRef(null);

  const [clickSendBtn, setClickSendBtn] = useState(false);

  const { findDiffGameId } = useGameStore();
  const { roomId } = useRoomStore();
  const { setOriginalImages, setGeneratedImages } = useImagesStore();
  const { userId } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if(file) {
      prepareFormData(file);
    }
  }, [canvasWrapperWidth])

  const sendToServer = async () => {
    setClickSendBtn(true);

    updateForm();

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
    const resizingImg = await ImgResizer(file, canvasWrapperWidth, canvasWrapperHeight);

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

  const updateForm = () => {
    // 마스킹 영역 업데이트
    const updatedInpaintForm = new FormData();

    // 기존 inpaintForm의 모든 데이터를 새 FormData 객체에 복사
    for (let [key, value] of inpaintForm.entries()) {
      updatedInpaintForm.append(key, value);
    }

    // 새로운 마스킹 좌표 설정
    updatedInpaintForm.set("maskX1", (x - length / 2)> 0 ? Math.round(x - length / 2) : 0);
    updatedInpaintForm.set("maskY1", (y - length / 2) > 0 ? Math.round(y - length / 2) : 0);
    updatedInpaintForm.set("maskX2", Math.round(x + length / 2));
    updatedInpaintForm.set("maskY2", Math.round(y + length / 2));

    console.log("Updated mask coordinates:", {
      maskX1: (x - length / 2) > 0 ? Math.round(x - length / 2) : 0,
      maskY1: (y - length / 2) > 0 ? Math.round(y - length / 2) : 0,
      maskX2: Math.round(x + length / 2),
      maskY2: Math.round(y + length / 2),
    });

    setInpaintForm(updatedInpaintForm);
  }

  const changeInput = (e) => {
    setFile(e.target.files[0])
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
              <CanvasContainer />

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
                    // onClick={sendToServer}
                    onClick={() => navigate("/game2")}
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