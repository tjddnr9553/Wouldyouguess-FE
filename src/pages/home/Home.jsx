import "./Home.css";
import {KAKAO_AUTH_URL} from "../../api/oauth/Oauth";

const Home = () => {

  const goToKakaoLogin = () => {
    window.localStorage.setItem("isInvited", "false");
    window.location.href = KAKAO_AUTH_URL;
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
