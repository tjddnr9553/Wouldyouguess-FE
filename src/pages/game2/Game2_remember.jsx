import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import User from "../../components/game/User";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";

const Game2_remember = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 추후 이미지(또는 인원수에 따라 시간조정 필요)
    setTimeout(() => {
      navigate("/game2");
    }, 15000);
  }, [navigate]);

  return (
    <div className="inner">
      {" "}
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
                <strong>Remember Image !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage">
                <Swiper
                  className=".swiper-container"
                  spaceBetween={0}
                  slidesPerView={1}
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
                    <div
                      className="swiperSlide"
                      style={{ backgroundImage: 'url("/images/clock-planet.png")' }}
                    ></div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <div
                      className="swiperSlide"
                      style={{
                        backgroundImage: 'url("/images/magnifier.png")',
                      }}
                    ></div>
                  </SwiperSlide>
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
