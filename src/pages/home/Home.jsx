import "./Home.css";
import { KAKAO_AUTH_URL } from "../../api/oauth/Oauth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAudioStore from "../../store/bgm/useAudioStore";

const Home = () => {
  const nav = useNavigate();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  const goToKakaoLogin = () => {
    nav("/temp/login");
    // window.localStorage.setItem("isInvited", "false");
    // window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="home background">
      <button className="img-button" onClick={goToKakaoLogin}>
        <img src="/images/btn/basic_btn.png" alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
    </div>
  );
};

export default Home;
