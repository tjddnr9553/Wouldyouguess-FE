import { useNavigate } from 'react-router-dom';
import './Home.css'
import { KAKAO_AUTH_URL } from '../../api/oauth/Oauth';
import { useState } from 'react';
import axios from 'axios';

const loginRequest = '/loginSuccess';

const Home = () => {
  // login 상태에 따른 화면 렌더링 상태를 변경하는 코드를 추가해야 함.

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate(null);

  const goToKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;      
  }

  // 로그인이 성공적으로 수행됐는지 확인
  // 
  const LoginData = async () => {
    const request = await axios.get(loginRequest);

    const isSuccessed = request.message;
    if (isSuccessed == "success") {
      const nickname = request.user.nickname;

      if (nickname == null) {
        nav("/nickname");
      } else {
        nav("lobby");
      }
    }
  }

 


  return (
    <div className="home background">
      { !isLoggedIn ? 
      (
        <button className="img-button" onClick={goToKakaoLogin}>
          <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
          <div className="btn-start">START</div>
        </button>
      ) : 
      (
      <button className="img-button" onClick={goToKakaoLogin}>
        <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
      )}
    </div>
  )
}

export default Home;
