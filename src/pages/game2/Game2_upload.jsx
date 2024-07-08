import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User";
import "./Game2.css";


const Game2_upload = () => {
  const imgSelctBtn = useRef(null);
  const previewImage = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState(null);
  const addImages = useImagesStore((state) => state.addImages);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      previewImage.current.style.backgroundImage = `url(${imageUrl})`;

      return () => {
        URL.revokeObjectURL(imageUrl);
        console.log("이미지 URL 삭제");
      };
    } else {
      previewImage.current.style.backgroundImage = "";
    }
  }, [selectedImage]);

  const imageSendToServer = async () => {
    navigate("/game2/remember");
    try {
      const res = await axios.post(
        // 서버 이미지 고정되어 있지 않아서 서버 재실행시 변경
        "https://4db5-34-143-228-123.ngrok-free.app/inpaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log("AI 서버로 이미지 전송 성공");
        // 반환받은 이미지 변환
        const base64Data = res.data.image;
        const binaryData = atob(base64Data);
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: "image/png" });

        const url = URL.createObjectURL(blob);

        // 테스트용으로 3번 주입
        addImages(url);
        addImages(url);
        addImages(url);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const selectImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    // 기존 이미지를 선택했던 것을 해제하고 새로운 이미지를 선택해 URL 생성
    setSelectedImage(file);

    formData.append("image", file); // 이미지 파일
    formData.append("mask_x1", 200); // 좌표(캔버스에서 입력받음)
    formData.append("mask_y1", 200); // 좌표(캔버스에서 입력받음)
    formData.append("mask_x2", 600); // 좌표(캔버스에서 입력받음)
    formData.append("mask_y2", 600); // 좌표(캔버스에서 입력받음)
    formData.append(
      "prompt",
      "Modify two random parts of the original image and create a new image with the changes highlighted by a bold stroke."
    ); // 프롬프트
    setFormData(formData);
  };

  const sendToServer = () => {
    if (selectedImage) {
      imageSendToServer(formData);
    } else {
      console.log("이미지 선택하지 않음");
    }
  };

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
                <strong>Upload Your Image !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage" ref={previewImage}></div>
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
                <NewButton
                  text={"Image Upload"}
                  onClick={() => imgSelctBtn.current.click()}
                ></NewButton>
                <NewButton text={"전송하기"} onClick={sendToServer}></NewButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2_upload;
