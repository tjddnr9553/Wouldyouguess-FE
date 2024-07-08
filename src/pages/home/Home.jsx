import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css'
import { KAKAO_AUTH_URL } from '../../api/oauth/Oauth';
import { useState, useEffect } from 'react';
import axios from 'axios';

let url = 'https://localhost:8080';
const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6484bad6b0521f31f7fca78c30752386&redirect_uri=${url}/login/oauth2/code/kakao`

// const loginRequest = 'http://localhost:8080/loginSuccess';



const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const getLoginData = async () => {
    const response = await axios.get('/loginSuccess');

    const { nickname } = response.data;

    if (!nickname) {
      nav("/lobby");
    } else {
      nav("/");
      }
  };


  const goToKakaoLogin = () => {
    window.location.href = kakaoLoginURL;
    
    setIsLoggedIn(true);
  };

  useEffect(() => {
    getLoginData();
  }, [isLoggedIn])

  useEffect(() => {
    getLoginData();
  }, [])


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
