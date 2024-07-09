import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginHandeler = (props) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const codeParam = currentUrl.searchParams.get("code");
    setCode(codeParam);
    console.log(code);
  });

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      const currentUrl = new URL(window.location.href);
      const codeParam = currentUrl.searchParams.get("code");

      await axios({
        method: "GET",
        url: `http://localhost:8080/auth/kakao/callback?code=${codeParam}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        navigate("/lobby");
      });
    };
    kakaoLogin();
  }, [props.history]);

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