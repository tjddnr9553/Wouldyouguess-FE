import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import User from "../../components/game/User";
import "./Game2.css";
import "swiper/css";
import "swiper/css/navigation";

const Game2_remember = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/image/og/mode2/${roomId}`
        );
        setImages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [roomId]);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      const timer = setTimeout(() => {
        navigate(`/game2/${roomId}`);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, images, navigate]);

  if (isLoading) {
    return <div>Loading images...</div>;
  }

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
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="swiperSlide"
                        style={{
                          backgroundImage: `url("${image.path}")`,
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
