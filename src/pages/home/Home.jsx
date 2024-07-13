import "./Home.css";
import {KAKAO_AUTH_URL} from "../../api/oauth/Oauth";
import {useNavigate} from "react-router-dom";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import {useEffect} from "react";

const Home = () => {
  const VITE_LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
  const VITE_OPENVIDU_APP_SERVER_URL = import.meta.env.VITE_OPENVIDU_APP_SERVER_URL;

  const nav = useNavigate();
  const {setLIVEKIT_URL, setAPPLICATION_SERVER_URL} = useWebrtcStore();

  useEffect(() => {
      console.log(VITE_LIVEKIT_URL)
      console.log(VITE_OPENVIDU_APP_SERVER_URL)
      setLIVEKIT_URL(VITE_LIVEKIT_URL);
      setAPPLICATION_SERVER_URL(VITE_OPENVIDU_APP_SERVER_URL);
  }, [])

  const goToKakaoLogin = () => {
    nav('/temp/login')
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
