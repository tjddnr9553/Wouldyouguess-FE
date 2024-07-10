import "./Home.css";
import { KAKAO_AUTH_URL } from "../../api/oauth/Oauth";
import useUserStore from "../../store/user/useUserStore";

const Home = () => {
  const isLogin = useUserStore((state) => state.isLogin);

  const goToKakaoLogin = () => {
    window.localStorage.setItem("isInvited", "false");
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="home background">
      {!isLogin ? (
        <button className="img-button" onClick={goToKakaoLogin}>
          <img src="/images/btn/basic_btn.png" alt="btn" className="btn-img" />
          <div className="btn-start">로그인</div>
        </button>
      ) : (
        <button className="img-button" onClick={loginJoinRoom}>
          <img src="/images/btn/basic_btn.png" alt="btn" className="btn-img" />
          <div className="btn-start">START</div>
        </button>
      )}
    </div>
  );
};

export default Home;
