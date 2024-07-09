import { useNavigate } from "react-router-dom";
import "./Home.css";
import { KAKAO_AUTH_URL } from "../../api/oauth/Oauth";
import { useState } from "react";
import axios from "axios";
import useUserStore from "../../store/user/useUserStore";

const Home = () => {
  const userId = useUserStore((state) => state.userId);
  const roomId = useUserStore((state) => state.roomId);
  const nickname = useUserStore((state) => state.nickname);
  const rank = useUserStore((state) => state.rank);
  const score = useUserStore((state) => state.score);
  const gameRole = useUserStore((state) => state.gameRole);

  const setUserId = useUserStore((state) => state.setUserId);
  const setNickname = useUserStore((state) => state.setNickname);
  const setRank = useUserStore((state) => state.setRank);
  const setScore = useUserStore((state) => state.setScore);
  const setGameRole = useUserStore((state) => state.setGameRole);

  const nav = useNavigate();

  // login 상태에 따른 화면 렌더링 상태를 변경하는 코드를 추가해야 함.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const goToKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const loginJoinRoom = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:8080/api/room/${roomId}/join`,
        data: { userId: userId },
        roomId: roomId,
      });
      if (res.status === 200) {
        navigate(`/lobby/${roomId.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home background">
      {!isLoggedIn ? (
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
