import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../../store/user/useUserStore.js";
import { auth_kakao_callback } from "./Oauth.js";
import { room_create, room_join } from "../home/Room.js";
import useRoomStore from "../../store/room/useRoomStore.js";

const LoginHandler = () => {
  const navigate = useNavigate();

  const inviteRoomId = localStorage.getItem("inviteRoomId");
  const isInvited = localStorage.getItem("isInvited") === "true";

  const { setUserId, setUsername, setNickname, setIsLogin, setIsInvite } =
    useUserStore();
  const { setRoomId } = useRoomStore();

  useEffect(() => {
    const sync_func = async () => {
      const currentUrl = new URL(window.location.href);
      const codeParam = currentUrl.searchParams.get("code");
      if (codeParam) {
        const login_response = await auth_kakao_callback(codeParam);
        console.log(login_response)
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
      }
    };

    sync_func();
  }, []);

  return <></>;
};

export default LoginHandler;
