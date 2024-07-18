import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";
import useAudioStore from "../../store/bgm/useAudioStore";
import {findDiff_original_images} from "../../api/game/FindDiff.js";
import useUserStore from "../../store/user/useUserStore.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";

const Game2_remember = () => {
  const navigate = useNavigate();

  const [originalImages, setOriginalImages] = useState([]);

  const { play, stop } = useAudioStore();
  const { userId} = useUserStore();
  const { findDiffGameId } = useFDGStore();

  useEffect(() => {
    play("/bgm/Game2_bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    const sync_func = async () => {
      const response = await findDiff_original_images(findDiffGameId, userId);
      setOriginalImages(response);
    }

    sync_func();

    const timer = setTimeout(() => {
      navigate(`/game2?round=1`);
    }, 30000);

    return () => clearTimeout(timer);
  }, [])


  return (
    <div className="inner">
      <div className="game2 container">
        <div className="center">
          <div className="game2_border">
            <div className="titleContainer">
              <div>
                <strong>Remember Image !</strong>
              </div>
            </div>
            <div className="imageContainer">
              <div className="previewImage containerWrapper">
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
                          backgroundSize: "contain",
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
