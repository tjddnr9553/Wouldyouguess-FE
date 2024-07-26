import "./Game2.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewButton from "../../components/button/newButton";
import FDGUploadCanvas from "./canvas/FDGUploadCanvas.jsx";

import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import useFDGCanvasStore from "../../store/game/findDiffGame/useFDGCanvasStore.js";
import useFDGFileStore from "../../store/game/findDiffGame/useFDGFileStore.js";

import ImgResizer from "./ImgResizer.js";
import { findDiff_upload } from "../../api/game/FindDiff.js";
import FDGAiGeneratedCanvas from "./canvas/FDGAiGeneratedCanvas.jsx";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import ImageLoading from "./ImageLoading.jsx";

const Game2_upload = () => {
  const navigate = useNavigate();

  const [showAnimation, setShowAnimation] = useState(false);
  const [canvasBlocking, setCanvasBlocking] = useState(false); // 게임 준비 완료 후 마스킹 금지

  const imgUploadBtn = useRef(null);

  const { roomId } = useRoomStore();
  const { userId } = useUserStore();
  const { socket } = useSocketStore();
  const { play, stop } = useAudioStore();

  const { findDiffGameId } = useFDGStore();
  const {
    originalImage,
    maskingImage,
    aiGeneratedImage,
    setResizingImage,
    setMaskingImage,
    setAiGeneratedImage,
  } = useFDGFileStore();
  const { FDGCanvasRef, startX, endX, startY, endY } = useFDGCanvasStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  const changeInput = async (e) => {
    const file = e.target.files[0];
    const resizingImg = await ImgResizer(file, 512, 512); // 512 변경 필요
    setResizingImage(resizingImg);
  };

  const sendToServer = async () => {
    // if (showAnimation) return;

    await FDGCanvasRef.toBlob(async (blob) => {
      setShowAnimation(true);
      setMaskingImage(blob);
      const upload_form = new FormData();
      upload_form.append("originalImage", originalImage, "originalImage.png");
      upload_form.append("maskingImage", blob, "maskingImage.png");
      upload_form.append("userId", userId);
      upload_form.append("gameId", findDiffGameId);
      upload_form.append("prompt", "Modify safely.");
      upload_form.append("maskX1", Math.round(startX));
      upload_form.append("maskX2", Math.round(endX));
      upload_form.append("maskY1", Math.round(startY));
      upload_form.append("maskY2", Math.round(endY));

      const upload_res = await findDiff_upload(upload_form);
      if (upload_res.status === 200) {
        setAiGeneratedImage(upload_res.data.aiGeneratedImageUrl);
        setShowAnimation(false);
      }
    }, "image/png");
    setCanvasBlocking(true);
  };

  const readyToStart = () => {
    navigate(`/loading`, { state: { title: "파일 업로드 중입니다." } });
    socket?.emit("game_loading", { roomId, nextPageUrl: "/game2?round=1" });
  };

  const thisRef = useRef();
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    if (thisRef.current && showAnimation) {
      const maskX1 = Math.round(startX);
      const maskY1 = Math.round(startY);
      const maskX2 = Math.round(endX);
      const maskY2 = Math.round(endY);

      const lengthX = Math.abs(maskX1 - maskX2);
      const lengthY = Math.abs(maskY1 - maskY2);

      thisRef.current.style.width = `${lengthX}px`;
      thisRef.current.style.height = `${lengthY}px`;
      thisRef.current.style.backgroundColor = "white";
      thisRef.current.style.top = `${maskY1}px`;
      thisRef.current.style.left = `${maskX1}px`;

      setAnimation(true);
    }
  }, [showAnimation]);

  useEffect(() => {
    if (thisRef.current && animation) {
      thisRef.current.style.border = "7px solid red";
      thisRef.current.style.backgroundColor = "transparent";
      thisRef.current.style.transition = "all 1s";
    }
  }, [aiGeneratedImage]);

  return (
    <div className="inner">
      <div className="game2 container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                {originalImage === null ? (
                  <strong>Upload Your Image !</strong>
                ) : aiGeneratedImage == null ? (
                  <strong>Select your masking area</strong>
                ) : (
                  <strong>AI Image Generation Complete</strong>
                )}
              </div>
            </div>

            <div className="imageContainer">
              <div className="containerWrapper">
                <div className="game2-canvas-container">
                  <FDGUploadCanvas canvasBlocking={canvasBlocking} />
                  {aiGeneratedImage == null ? (
                    showAnimation ? (
                      <FDGAiGeneratedCanvas
                        mode={"upload"}
                        image={originalImage}
                        maskX1={Math.round(startX)}
                        maskY1={Math.round(startY)}
                        maskX2={Math.round(endX)}
                        maskY2={Math.round(endY)}
                      />
                    ) : (
                      <div className="ai-generated-img-wrap"></div>
                    )
                  ) : (
                    <FDGAiGeneratedCanvas
                      mode={"aiImgUpload"}
                      image={aiGeneratedImage}
                      maskX1={Math.round(startX)}
                      maskY1={Math.round(startY)}
                      maskX2={Math.round(endX)}
                      maskY2={Math.round(endY)}
                    />
                  )}
                  <div
                    style={{
                      width: "512px",
                      height: "512px",
                      position: "absolute",
                      right: "59px",
                    }}
                  >
                    {showAnimation ? (
                      <div
                        ref={thisRef}
                        className="boundingBox"
                        style={{
                          position: "absolute",
                          zIndex: 10,
                        }}
                      >
                        <video
                          src="/images/game2/imageLoading.mp4"
                          muted={true}
                          autoPlay={true}
                          loop={true}
                        />
                        <ImageLoading />
                      </div>
                    ) : animation ? (
                      <div
                        ref={thisRef}
                        className="boundingBox"
                        style={{
                          position: "absolute",
                          zIndex: 10,
                        }}
                      ></div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="imageBtnContainer">
                <input
                  type="file"
                  id="imageFile"
                  ref={imgUploadBtn}
                  onChange={changeInput}
                  accept="image/png"
                  style={{ display: "none" }}
                />
                {originalImage === null ? (
                  <NewButton
                    text={"Upload"}
                    onClick={() => imgUploadBtn.current.click()}
                  />
                ) : aiGeneratedImage === null ? (
                  <NewButton text={"이미지 생성"} onClick={sendToServer} />
                ) : (
                  <div className="game2-bottom">
                    <NewButton
                      text={"이미지 다시 생성"}
                      onClick={sendToServer}
                    />
                    <NewButton text={"준비 완료!"} onClick={readyToStart} />
                  </div>
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
