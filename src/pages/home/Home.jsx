import { useNavigate } from 'react-router-dom';
import './Home.css'
import { KAKAO_AUTH_URL } from '../../api/oauth/Oauth';
import { useState } from 'react';

const Home = () => {
  const nav = useNavigate();

  // login 상태에 따른 화면 렌더링 상태를 변경하는 코드를 추가해야 함.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // window.location.replace(KAKAO_AUTH_URL)

  return ( 
    <div className="home background">
      { !isLoggedIn ? 
      (
        <button className="img-button" onClick={() => { nav('/lobby') }}>
          <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
          <div className="btn-start">START</div>
        </button>
      ) : 
      (
      <button className="img-button" onClick={() => { nav('/lobby') }}>
        <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
      )}
    </div>
  )
}

export default Home;
