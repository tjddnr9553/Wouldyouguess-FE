import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NewButton from "../../components/button/newButton.jsx";
import useImagesStore from "../../store/image/useImagesStore.js";
import useAudioStore from "../../store/bgm/useAudioStore";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";
import {findDiff_result} from "../../api/game/FindDiff.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";

const Game2_result = () => {
  const navigate = useNavigate();

  const [resultList, setResultList] = useState([]);

  const { originalImages, generatedImages } = useImagesStore();
  const { findDiffGameId } = useFDGStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/Result_bgm.mp3");

    const sync_func = async () => {
      const res = await findDiff_result(findDiffGameId);
      setResultList(res);
    }

    sync_func();
    return () => {
      stop();
    };
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
          <div className="previewImage containerWrapper">
            <Swiper
              className="swiper-container"
              spaceBetween={0} // 슬라이드 간격
              slidesPerView={1} // 한 번에 표시할 슬라이드 수 
              slidesPerGroup={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation]}
              navigation={true}
              direction={"horizontal"}
            >
              {resultList.map((result, index) => (
                <SwiperSlide key={index}>
                  <div className="slide-container">
                    <div
                      className="swiperSlide"
                      style={{ backgroundImage: `url(${result.maskingImageUrl})` }}
                    ></div>
                    <div
                      className="swiperSlide"
                      style={{
                        backgroundImage: `url(${result.generatedImageUrl})`,
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