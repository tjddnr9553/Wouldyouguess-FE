import {useEffect, useRef, useState} from "react";
import NewButton from "../../components/button/newButton";
import "./Game2.css";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import FDGCanvas from "./canvas/FDGCanvas.jsx";
import ImgResizer from "./ImgResizer.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import {findDiff_upload,} from "../../api/game/FindDiff.js";
import useFDGCanvasStore from "../../store/game/findDiffGame/useFDGCanvasStore.js";
import useFDGFileStore from "../../store/game/findDiffGame/useFDGFileStore.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";
import {useNavigate} from "react-router-dom";
import useSocketStore from "../../store/socket/useSocketStore.js";

const Game2_upload = () => {
  const navigate = useNavigate();
  const imgSelectBtn = useRef(null);

  const [oneClick, setOneClick] = useState(false);

  const { roomId } = useRoomStore();
  const { userId } = useUserStore();
  const { socket } = useSocketStore();
  const { play, stop } = useAudioStore();

  const { isImgUploaded, FDGCanvasRef, x, y  } = useFDGCanvasStore();
  const { originalFile, setUploadFile  } = useFDGFileStore();
  const { clickSendBtn } = useFDGStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  const changeInput = async (e) => {
    const file = e.target.files[0];
    const resizingImg = await ImgResizer(file, 512, 512); // 512 변경 필요
    setUploadFile(resizingImg);
  };

  const sendToServer = async () => {
    if (oneClick) return;

    await FDGCanvasRef.toBlob( async (blob) => {
      setOneClick(true);

      const length = 100;
      const maskX1 = x - length / 2 > 0 ? Math.round(x - length / 2) : 0;
      const maskY1 = y - length / 2 > 0 ? Math.round(y - length / 2) : 0;
      const maskX2 = Math.round(x + length / 2);
      const maskY2 = Math.round(y + length / 2);

      const upload_form = new FormData();
      upload_form.append('originalImage', originalFile, 'originalImage.png');
      upload_form.append('maskingImage', blob, 'maskingImage.png');
      upload_form.append("userId", userId);
      upload_form.append("prompt", "Modify safely.");
      upload_form.append("maskX1", maskX1);
      upload_form.append("maskY1", maskY1);
      upload_form.append("maskX2", maskX2);
      upload_form.append("maskY2", maskY2);

      const upload_res = await findDiff_upload(upload_form);
      if (upload_res.status === 200) {
        socket?.emit("game_loading", { roomId, nextPageUrl: "/game2/remember" });
        navigate(`/loading`, {state : { title: "파일 업로드 중입니다." }});
      }
    }, 'image/png');

  };

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
                  <FDGCanvas />
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
                    onClick={() => imgSelectBtn.current.click()}
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
