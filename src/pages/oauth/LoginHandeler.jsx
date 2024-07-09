import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {kakao_login} from "../../api/oauth/Oauth.js";

const LoginHandeler = () => {
  const navigate = useNavigate();

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const codeParam = currentUrl.searchParams.get("code");
    kakao_login(codeParam);
    navigate("/lobby");
  }, []);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandeler;