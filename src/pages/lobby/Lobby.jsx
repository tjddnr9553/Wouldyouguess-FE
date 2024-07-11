import { useNavigate } from "react-router-dom";

import "./Lobby.css";
import PlayerSidebar from "./PlayerSidebar.jsx";
import Planet from "../../components/game/Planet.jsx";
import Header from "../../components/game/Header.jsx";
import Invite from "../../components/lobby/Invite.jsx";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { room_create } from "../../api/home/Room.js";
import Modal from "../../components/lobby/Modal.jsx";
import useRoomStore from "../../store/room/useRoomStore.js";
import { catchLiar_start } from "../../api/game/CatchLiar.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";

const textList = [
  {
    id: "game1",
    text: "재미있는 라이어 게임 입니다.",
  },
  {
    id: "game2",
    text: "재미있는 틀린 부분 찾기 입니다.",
  },
  {
    id: "game3",
    text: "아주아주 재밌는 game3 입니다.",
  },
];

const Lobby = () => {
  const navigate = useNavigate();

  const modalRef = useRef(null);
  const currentRoomId = window.location.href.split("/").pop();
  const roomUrl = `http://localhost:5173/invite/${currentRoomId}`;

  const { userId, isInvited, nickname } = useUserStore();
  const { roomId } = useRoomStore();
  const { socket, setSocket } = useSocketStore();
  let modalOn = false;
  const { setGameId } = useCatchLiarStore();

  const { joinRoom } = useWebrtcStore();

  // 뒤로가기 방지
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);

    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  useEffect(() => {
    const socketConnect = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(socketConnect);
    useEffect(() => {
      // 룸에 참가시키기
      if (roomId && nickname) {
        joinRoom(); // 룸 접속 함수 호출
      }
    }, [roomId, nickname]); // 의존성 배열 추가

    socketConnect.on("connect", () => {
      if (isInvite) {
        socketConnect.emit("room_join", { roomId, userId });
      } else {
        socketConnect.emit("room_create", { roomId, userId });
      }
    });

    socketConnect.on("game_start", (data) => {
      console.log(data);
      if (data.mode === 1) {
        setGameId(data.gameId);
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      } else if (data.mode === 2) {
        navigate(`/game2/upload`);
      }
    });

    // 연결이 끊어졌을 때
    // socketConnect.on("disconnect", async (reason) => {
    //   socketConnect.emit("room_exit", { roomId, userId });
    //   await room_exit(roomId, userId);
    // });

    return () => {
      // socketConnect.disconnect();
      socketConnect?.off("game_start", (data) => {
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      });
    };
  }, [setSocket]);

  //   return () => {
  //     // socketConnect.disconnect();
  //     socketConnect?.off("game_start", (data) => {
  //       navigate(`/test?gameId=${data.gameId}&round=1`);
  //     });
  //   };
  // }, [setSocket]);

  // 친구 초대 모달창
  const handleModal = () => {
    if (modalOn) {
      modalRef.current.style.display = "none";
      modalOn = false;
    } else {
      modalRef.current.style.display = "flex";
      modalOn = true;
    }
  };

  const startCatchLiar = async () => {
    const gameId = await catchLiar_start(roomId);
    setGameId(gameId);

    socket.emit("game_start", { mode: 1, userId, roomId, gameId });
    navigate(`/game1?gameId=${gameId}&round=1`);
  };

  const startFindAIGeneratedImage = () => {
    socket.emit("game_start", { mode: 2, userId, roomId });
    navigate("/game2/upload");
  };

  return (
    <div className="inner">
      <div className="lobby container">
        <Header />
        <div className="modal-container" ref={modalRef}>
          <span className="close" onClick={handleModal}>
            X
          </span>
          <Modal text={`${window.location.origin}/invite/${roomId}`} />
        </div>
        <div className="content">
          <div className="side">
            <PlayerSidebar />
            <div className="inviteBtn">
              <Invite onClick={handleModal} />
            </div>
          </div>

          <div className="game-content">
            <Planet
              style={{ top: "10%" }}
              id={"planet4"}
              min={5}
              max={15}
              text={textList[0].text}
              onClick={startCatchLiar}
            />
            <Planet
              style={{ bottom: "5%", left: "30%" }}
              id={"planet2"}
              min={5}
              max={25}
              text={textList[1].text}
              onClick={startFindAIGeneratedImage}
            />
            <Planet
              style={{ right: "12%" }}
              id={"planet5"}
              min={5}
              max={20}
              text={textList[2].text}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lobby;
