import { useNavigate } from 'react-router-dom';
import './Home.css'
import { KAKAO_AUTH_URL } from '../../api/oauth/Oauth';
import { useState } from 'react';

const Home = () => {
  const nav = useNavigate();

  // login 상태에 따른 화면 렌더링 상태를 변경하는 코드를 추가해야 함.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginOrCreateRoom = () => {

  }


  return (
    <div className="home background">
      <button className="img-button" onClick={loginOrCreateRoom}>
        <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
      {/*{ !isLoggedIn ? */}
      {/*(*/}
      {/*  <button className="login-btn" onClick={() => { setIsLoggedIn(true) }}>*/}
      {/*    <img src='/images/btn/kakao_login.png' alt='kakao login' />*/}
      {/*  </button>*/}
      {/*) : */}
      {/*(*/}
      {/*<button className="img-button" onClick={() => { nav('/lobby') }}>*/}
      {/*  <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />*/}
      {/*  <div className="btn-start">START</div>*/}
      {/*</button>*/}
      {/*)}*/}
    </div>
  )
}

export default Home;
