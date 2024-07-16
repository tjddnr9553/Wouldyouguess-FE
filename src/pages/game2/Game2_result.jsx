import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NewButton from "../../components/button/newButton.jsx";
import useImagesStore from "../../store/image/useImagesStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";
import User from "../../components/game/User.tsx";

const Game2_result = () => {
  const navigate = useNavigate();

  const previewImage = useRef(null);

  const { roomId } = useParams();

  const { originalImages, generatedImages } = useImagesStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  return (
    <div className="inner">
      <div className="left-section">
        {/* <User /> */}
      </div>
      <div className="game2_border">
        <div className="titleContainer">
          <div>
            <strong>Result</strong>
          </div>
        </div>
        <div className="imageContainer">
          <div className="previewImage">
            <Swiper
              className="swiper-container"
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation]}
              navigation={true}
              direction={"horizontal"}
            >
              {originalImages.map((originalImage, index) => (
                <SwiperSlide key={index}>
                  <div className="slide-container">
                    <div
                      className="swiperSlide"
                      style={{ backgroundImage: `url(${originalImage})` }}
                    ></div>
                    <div
                      className="swiperSlide"
                      style={{
                        backgroundImage: `url(${generatedImages[index] || ""})`,
                      }}
                    ></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="imageBtnContainer">
            <NewButton
              text={"랭킹 확인"}
              onClick={() => navigate("/lobby")}
            ></NewButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2_result;
