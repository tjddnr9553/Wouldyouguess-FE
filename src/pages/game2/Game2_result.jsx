import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NewButton from "../../components/button/newButton";
import useImagesStore from "../../store/useImagesStore";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";

const Game2 = () => {
  const navigate = useNavigate();
  const images = useImagesStore((state) => state.images);
  const previewImage = useRef(null);

  useEffect(() => {
    images.forEach((image, index) => {
      console.log(image);
      previewImage.current.style.backgroundImage = `url(${image})`;
      return () => URL.revokeObjectURL(image);
    }); // 0초, 5초, 10초(5초 간격으로 넘어감)
  }, []);

  return (
    <div className="inner">
      <div className="game2_border">
        <div className="titleContainer">
          <div>
            <strong>Result</strong>
          </div>
        </div>
        <div className="imageContainer">
          <div className="previewImage">
            <Swiper
              className=".swiper-container"
              spaceBetween={0}
              slidesPerView={2}
              slidesPerGroup={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation]}
              navigation={true}
            >
              <SwiperSlide>
                {" "}
                <div
                  className="swiperSlide"
                  style={{
                    backgroundImage: 'url("/images/background-img.png")',
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div className="swiperSlide" ref={previewImage}></div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div
                  className="swiperSlide"
                  style={{ backgroundImage: 'url("/images/player_img.png")' }}
                ></div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div className="swiperSlide" ref={previewImage}></div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div
                  className="swiperSlide"
                  style={{ backgroundImage: 'url("/images/btn.png")' }}
                ></div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <div className="swiperSlide" ref={previewImage}></div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="imageBtnContainer">
            <NewButton
              text={"랭킹 확인"}
              onClick={() => navigate("/waitRoom")}
            ></NewButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2;
