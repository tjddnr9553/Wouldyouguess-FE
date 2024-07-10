import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useUserStore from "../../store/user/useUserStore.js";

const LoginHandler = () => {
  const navigate = useNavigate();
  // const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);
  const username = useUserStore((state) => state.username);
  const participateRoomId = useUserStore((state) => state.participateRoomId);
  const isLogin = useUserStore((state) => state.isLogin);

  // const setUserId = useUserStore((state) => state.setUserId);
  const setParticipateRoomId = useUserStore(
    (state) => state.setParticipateRoomId
  );
  const setIsLogin = useUserStore((state) => state.setIsLogin);
  const inviteUrl = localStorage.getItem("inviteUrl");
  const isInvited = localStorage.getItem("isInvited");

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log("유저 기본 정보");
    console.log("userId : ", userId);
    console.log("nickname : ", nickname);
    console.log("username : ", username);
    console.log("participateRoomId : ", participateRoomId);
    console.log("isLogin : ", isLogin);
    console.log("isInvited : ", isInvited); // 초대 링크로 바로 접속했을 경우 isInvited를 false
  }, [userId, nickname, username, participateRoomId, isLogin]);

  // 로그인이 성공적으로 수행됐는지 확인
  const LoginData = async (result) => {
    const res = await axios.get("/loginSuccess");
    localStorage.setItem("userId", result.data.id);

    if (res.status === 200) {
      setIsLogin(true);
      console.log("로그인 성공");
      if (nickname === null) {
        navigate("/profile");
      } else if (isInvited === "false") {
        console.log("방 만들기");
        loginCreateRoom();
      } else {
        console.log("방 참가하기");
        loginJoinRoom(inviteUrl); // inviteRoomId를 파라미터로 전달
      }
    }
  };

  // 방장이 방 만들기
  const loginCreateRoom = async () => {
    try {
      const roomId = await axios({
        method: "POST",
        url: "http://localhost:8080/api/room",
        data: { userId: userId },
      });
      console.log("방 번호", roomId.data);
      await loginJoinRoom(roomId.data); // loginJoinRoom 함수를 await로 호출
    } catch (error) {
      console.log(error);
    }
  };

  // 초대받은 사람들 방에 참여하기
  const loginJoinRoom = async (inviteRoomId) => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:8080/api/room/${inviteRoomId}/join`,
        data: { userId: userId },
      });
      if (res.status === 200) {
        window.localStorage.setItem("isInvited", "false");
        setParticipateRoomId(inviteRoomId); // 초대 roomId 설정
        navigate(`/lobby/${inviteRoomId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const codeParam = currentUrl.searchParams.get("code");
    if (codeParam) {
      axios({
        method: "GET",
        url: `http://localhost:8080/auth/kakao/callback?code=${codeParam}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        LoginData(res);
      });
    }
  }, []);

  // return (
  //   <div className="LoginHandeler">
  //     <div className="notice">
  //       <p>로그인 중입니다.</p>
  //       <p>잠시만 기다려주세요.</p>
  //       <div className="spinner"></div>
  //     </div>
  //   </div>
  // );
};

export default LoginHandler;
