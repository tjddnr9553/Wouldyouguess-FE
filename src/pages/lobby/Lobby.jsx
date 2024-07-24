import "./Lobby.css";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import PlayerSidebar from "./PlayerSidebar.jsx";
import Planet from "../../components/game/Planet.jsx";
import Header from "../../components/game/Header.jsx";
import Invite from "../../components/lobby/Invite.jsx";
import Modal from "../../components/lobby/Modal.jsx";

import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";

import { catchLiar_start } from "../../api/game/CatchLiar.js";
import { findDiff_start } from "../../api/game/FindDiff.js";

const Lobby = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let modalOn = false;
  const modalRef = useRef(null);

  const { userId, isInvite } = useUserStore();
  const { roomId } = useRoomStore();
  const { setFindDiffGameId } = useFDGStore();
  const { socket, setSocket } = useSocketStore();
  const { setGameId } = useCatchLiarStore();
  const { joinRoom } = useWebrtcStore();
  const { play, stop } = useAudioStore();

  useEffect(() => {
    play("/bgm/bgm.mp3");

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    // 룸에 참가시키기
    if (roomId && userId) {
      joinRoom(roomId, userId.toString()); // 룸 접속 함수 호출
    }
  }, [roomId, userId]); // 의존성 배열 추가

  useEffect(() => {
    if (location.state?.from === "/temp/login") {
      const socketConnect = io(import.meta.env.VITE_SOCKET_SERVER_URL);
      setSocket(socketConnect);

      socketConnect.on("connect", () => {
        if (isInvite) {
          socketConnect.emit("room_join", { roomId, userId });
        } else {
          socketConnect.emit("room_create", { roomId, userId });
        }
      });
    }
  }, [location.state]);

  useEffect(() => {
    socket?.on("game_start", (data) => {
      if (data.mode === 1) {
        setGameId(data.gameId);
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      } else if (data.mode === 2) {
        setFindDiffGameId(data.gameId);
        navigate(`/game2/upload`);
      }
    });

    return () => {
      socket?.off("game_start", (data) => {
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      });
    };
  }, [socket]);

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
    socket.emit("game_start", { mode: 1, userId, roomId, gameId });
  };

  const startFindDIff = async () => {
    const gameId = await findDiff_start(roomId);
    socket?.emit("game_start", { mode: 2, userId, roomId, gameId });
  };

  return (
    <div className="inner">
      <div className="lobby container">
        <Header />
        <div className="modal-container" ref={modalRef}>
          <span className="close" onClick={handleModal}>
            X
          </span>
          <Modal text1={`${window.location.origin}/invite/${roomId}`} />
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
              style={{ top: "7%" }}
              id={"planet1"}
              min={5}
              max={15}
              onClick={startCatchLiar}
              game={"game1"}
            />
            <Planet
              style={{ bottom: "0%", left: "30%" }}
              id={"planet2"}
              min={5}
              max={25}
              onClick={startFindDIff}
              game={"game2"}
            />
            <Planet style={{ right: "3%" }} id={"planet3"} min={5} max={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
