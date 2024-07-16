import "./Home.css";
import { KAKAO_AUTH_URL } from "../../api/oauth/Oauth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAudioStore from "../../store/bgm/useAudioStore";

const Home = () => {
  const nav = useNavigate();
  const { play, stop } = useAudioStore();
  const [isStartClicked, setIsStartClicked] = useState(false); // 상태 추가

  useEffect(() => {
    if (isStartClicked) {
      // 버튼 클릭 시에만 재생
      play("/bgm/bgm.mp3");
    }

    return () => {
      stop();
    };
  }, [isStartClicked]); // isStartClicked 상태 변경 시 useEffect 실행

  const goToKakaoLogin = () => {
    setIsStartClicked(true); // 버튼 클릭 상태 변경
    nav("/temp/login");
    // window.localStorage.setItem("isInvited", "false");
    // window.location.href = KAKAO_AUTH_URL;
  };

  return (
      <div className="home background">
        <div className="home-title">
          <div className="logo-title" id="black">Would you Guess?</div>
          <div className="logo-title" id="white">Would you Guess?</div>
        </div>
        {/* <img src="/images/logo/WouldyouGuess.png" id="logo-title" alt="logo title" /> */}
        <img src="/images/logo/home-logo.svg" id="home-logo" alt="logo img"/>
        <button className="img-button" onClick={goToKakaoLogin}>
          <img src="/images/btn/basic_btn.png" alt="btn" className="btn-img" />
          <div className="btn-start">START</div>
        </button>
      </div>
  );
};

export default Home;
