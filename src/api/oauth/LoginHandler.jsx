import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import { auth_kakao_callback } from "./Oauth.js";
import { room_create, room_join } from "../home/Room.js";

const LoginHandler = () => {
  const navigate = useNavigate();

  const inviteRoomId = localStorage.getItem("inviteUrl");
  const isInvited = localStorage.getItem("isInvited") === "true";

  const {
    setUserId,
    setUsername,
    setNickname,
    setIsLogin,
    setIsInvite,
    nickname,
  } = useUserStore();
  const { setRoomId } = useRoomStore();

  useEffect(() => {
    const handleLogin = async () => {
      const currentUrl = new URL(window.location.href);
      const codeParam = currentUrl.searchParams.get("code");
      if (codeParam) {
        try {
          const login_response = await auth_kakao_callback(codeParam);
          const userId = login_response.user_id;
          setUserId(userId);
          setUsername(login_response.username);
          setIsLogin(true);
          setIsInvite(isInvited);

          if (login_response.nickname === null) {
            navigate("/profile");
            return;
          }
          setNickname(login_response.nickname);

          const roomId = isInvited
            ? await room_join(userId, inviteRoomId)
            : await room_create(userId);
          setRoomId(roomId);
          window.localStorage.removeItem("isInvited");
          navigate(`/lobby/${roomId}`);
        } catch (error) {
          console.error("카카오 로그인 처리 중 오류 발생:", error);
        }
      }
    };

    handleLogin();
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
