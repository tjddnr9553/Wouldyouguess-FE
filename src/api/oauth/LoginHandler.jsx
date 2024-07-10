import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "../../store/user/useUserStore.js";
import { jwtDecode } from "jwt-decode";

const LoginHandler = () => {
  const navigate = useNavigate();
  const {
    nickname,
    username,
    participateRoomId,
    isLogin,
    setUsername,
    setParticipateRoomId,
    setIsLogin,
  } = useUserStore();

  const inviteUrl = localStorage.getItem("inviteUrl");
  const isInvited = localStorage.getItem("isInvited");

  useEffect(() => {
    console.log("유저 기본 정보", {
      username,
      nickname,
      participateRoomId,
      isLogin,
      isInvited,
    });
  }, [username, nickname, participateRoomId, isLogin]);

  const handleLoginSuccess = (loginResponse) => {
    const { success, message, accessToken, refreshToken, username } =
      loginResponse;

    if (success) {
      setIsLogin(true);
      setUsername(username);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("로그인 성공:", message);

      if (nickname === null) {
        navigate("/profile");
      } else if (isInvited === "false") {
        console.log("방 만들기");
        loginCreateRoom(accessToken);
      } else {
        console.log("방 참가하기");
        loginJoinRoom(inviteUrl, accessToken);
      }
    } else {
      console.error("로그인 실패:", message);
    }
  };

  const loginCreateRoom = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const kakaoId = decodedToken.sub;

      console.log(`KakaoId : ${kakaoId}`);
      const response = await axios.post(
        "http://localhost:8080/api/room",
        { kakaoId: kakaoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const roomId = response.data;
      console.log("방 번호", roomId);
      await loginJoinRoom(roomId, token);
    } catch (error) {
      console.error("방 생성 중 오류 발생:", error);
    }
  };

  const loginJoinRoom = async (inviteRoomId, token) => {
    try {
      const decodedToken = jwtDecode(token);
      const kakaoId = decodedToken.sub;
      
      const res = await axios.post(
        `http://localhost:8080/api/room/${inviteRoomId}/join`,
        { kakaoId : kakaoId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("isInvited", "false");
        setParticipateRoomId(inviteRoomId);
        navigate(`/lobby/${inviteRoomId}`);
      }
    } catch (error) {
      console.error("방 참가 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const codeParam = currentUrl.searchParams.get("code");
    if (codeParam) {
      axios
        .get(`http://localhost:8080/auth/kakao/callback?code=${codeParam}`, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then((response) => {
          handleLoginSuccess(response.data);
        })
        .catch((error) =>
          console.error("카카오 로그인 처리 중 오류 발생:", error)
        );
    }
  }, []);

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;