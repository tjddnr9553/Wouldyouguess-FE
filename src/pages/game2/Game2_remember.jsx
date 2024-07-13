import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import User from "../../components/game/User";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";
import useRoomStore from "../../store/room/useRoomStore";
import useImagesStore from "../../store/image/useImagesStore";

const Game2_remember = () => {
  const navigate = useNavigate();
  const { roomId } = useRoomStore();
  const { originalImages  } = useImagesStore();

  useEffect(() => {
    console.log("OriginalImages : ", originalImages);
    const timer = setTimeout(() => {
      navigate(`/game2/`);
    }, 10000);

    return () => clearTimeout(timer);
    
  }, [originalImages, navigate, roomId]);

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
                <strong>Remember Image !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage">
                <Swiper
                  className=".swiper-container swiper-parent"
                  spaceBetween={0}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Navigation]}
                  navigation={true}
                >
                  {originalImages.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="swiperSlide"
                        style={{
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default Game2_remember;
