import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/image/useImagesStore.js";
import User from "../../components/game/User";
import "./Game2.css";
import { jwtDecode } from "jwt-decode";


const Game2_upload = () => {
  const imgSelctBtn = useRef(null);
  const previewImage = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { roomId } = useParams();
  const [formData, setFormData] = useState(null);
  const addImages = useImagesStore((state) => state.addImages);

  const token = localStorage.getItem("accessToken")
  const decodedToken = jwtDecode(token);
  const kakaoId = decodedToken.sub;

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

  const sendToServer = async () => {
    try {
      const inpaintRes = await axios.post(
        "http://localhost:8080/api/image/inpaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadResponse = await axios.post(
        "http://localhost:8080/api/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log("서버로 이미지 전송 성공");
        
        // 원본 이미지와 생성된 이미지 URL 추출
        const originalImageUrl = res.data.original.path;
        const generatedImageUrl = res.data.generated.path;

        // 원본 이미지와 생성된 이미지를 상태에 추가
        addImages(originalImageUrl);
        addImages(generatedImageUrl);

        console.log("Original Image URL:", originalImageUrl);
        console.log("Generated Image URL:", generatedImageUrl);
      }
    } catch (e) {
      console.error("이미지 전송 중 오류 발생:", e);
    }
  };

  const selectImage = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    setSelectedImage(file);

    formData.append("image", file);
    formData.append("mask_x1", 200);
    formData.append("mask_y1", 200);
    formData.append("mask_x2", 600);
    formData.append("mask_y2", 600);
    formData.append("roomId", roomId); // 실제 방 ID로 교체해야 합니다
    formData.append("userId", kakaoId); // 실제 사용자 ID로 교체해야 합니다
    formData.append(
      "prompt",
      "Modify safely."
    );
    formData.append("mode", "mode2"); // 또는 적절한 모드 값

    setFormData(formData);
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
