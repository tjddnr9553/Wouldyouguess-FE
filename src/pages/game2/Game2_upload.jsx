import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useGameStore, {
  useCanvasStore,
  useFileStore,
} from "../../store/game/useGameStore.js";
import Canvas from "./canvas/Canvas.jsx";
import ImgResizer from "./ImgResizer.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import {
  findDiff_gen,
  findDiff_inpaint,
  findDiff_og,
  findDiff_upload,
} from "../../api/game/FindDiff.js";
import Loading from "../../components/loading/Loading.jsx";

const Game2_upload = () => {
  const { isImgUploaded, x, y, isMaskingComplete } = useCanvasStore();
  const {
    file,
    setFile,
    uploadForm,
    updateUploadForm,
    inpaintForm,
    updateInpaintForm,
  } = useFileStore();
  const { clickSendBtn, setClickSendBtn, findDiffGameId } = useGameStore();
  const imgSelectBtn = useRef(null);

  const { roomId } = useRoomStore();
  const { setOriginalImages, setGeneratedImages } = useImagesStore();
  const { userId } = useUserStore();
  const { play, stop } = useAudioStore();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/game2/remember/"), 30000);

    play("/bgm/Game2_bgm.mp3"); // 게임2 시작 시 음악 재생

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    if (isMaskingComplete) {
      sendToServer();
    }
  }, [isMaskingComplete]);

  const sendToServer = async () => {
    updateForm();

    const uploadRes = await findDiff_upload(uploadForm);
    if (uploadRes === "OK") {
      const response = await findDiff_og(findDiffGameId, userId);
      if (response) {
        setOriginalImages(response); // 여기서는 URL만 포함된 배열을 받습니다.
      }

      setTimeout(async () => {
        await findDiff_inpaint(inpaintForm);
        const genResponse = await findDiff_gen(findDiffGameId, userId);
        setGeneratedImages(genResponse);
      }, 0);
    }
  };

  const prepareFormData = async (file) => {
    const resizingImg = await ImgResizer(file, 512, 512); // 512 변경 필요
    setFile(resizingImg);

    updateInpaintForm("roomId", roomId);
    updateInpaintForm("userId", userId);
    updateInpaintForm("prompt", "Modify safely.");

    updateUploadForm("roomId", roomId);
    updateUploadForm("userId", userId);
  };

  const updateForm = () => {
    const length = 100;

    const maskX1 = x - length / 2 > 0 ? Math.round(x - length / 2) : 0;
    const maskY1 = y - length / 2 > 0 ? Math.round(y - length / 2) : 0;
    const maskX2 = Math.round(x + length / 2);
    const maskY2 = Math.round(y + length / 2);

    // 새로운 마스킹 좌표 설정
    updateInpaintForm("maskX1", maskX1);
    updateInpaintForm("maskY1", maskY1);
    updateInpaintForm("maskX2", maskX2);
    updateInpaintForm("maskY2", maskY2);
  };

  const changeInput = (e) => {
    prepareFormData(e.target.files[0]);
  };

  if(isMaskingComplete) {
    return (
      <Loading text={'파일 업로드 중입니다.'} />
    )
  }

  return (
    <div className="inner">
      <div className="game2 container">
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
