import {useNavigate} from "react-router-dom";

import "./Lobby.css";
import PlayerSidebar from "./PlayerSidebar.jsx";
import Planet from "../../components/game/Planet.jsx";
import Header from "../../components/game/Header.jsx";
import Invite from "../../components/lobby/Invite.jsx";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useUserStore from "../../store/user/useUserStore.js";
import {io} from "socket.io-client";
import {useEffect, useRef} from "react";
import {room_create} from "../../api/home/Room.js";
import Modal from "../../components/lobby/Modal.jsx";
import useRoomStore from "../../store/room/useRoomStore.js";
import {catchLiar_start} from "../../api/game/CatchLiar.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import {findDiff_start} from "../../api/game/FindDiff.js";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import useFDGStore from "../../store/game/findDiffGame/useFDGStore.js";

const textList = [
  {
    id: "game1",
    text: "재미있는 라이어 게임 입니다.",
  },
  {
    id: "game2",
    text: "틀린 그림을 찾아보세요!!",
  },
  {
    id: "game3",
    text: "",
  },
];

const Lobby = () => {
  const navigate = useNavigate();

  let modalOn = false;
  const modalRef = useRef(null);

  const { userId, isInvite, nickname } = useUserStore();
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
    if (roomId && nickname) {
      joinRoom(roomId, nickname); // 룸 접속 함수 호출
    }
  }, [roomId, nickname]); // 의존성 배열 추가

  useEffect(() => {
    const socketConnect = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(socketConnect);

    socketConnect.on("connect", () => {
      if (isInvite) {
        socketConnect.emit("room_join", { roomId, userId });
      } else {
        socketConnect.emit("room_create", { roomId, userId });
      }
    });

    socketConnect.on("game_start", (data) => {
      if (data.mode === 1) {
        setGameId(data.gameId);
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      } else if (data.mode === 2) {
        setFindDiffGameId(data.gameId)
        navigate(`/game2/upload`);
      }
    });

    return () => {
      socketConnect?.off("game_start", (data) => {
        navigate(`/game1?gameId=${data.gameId}&round=1`);
      });
    };
  }, [setSocket]);

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
              text={textList[0].text}
              onClick={startCatchLiar}
            />
            <Planet
              style={{ bottom: "0%", left: "30%" }}
              id={"planet2"}
              min={5}
              max={25}
              text={textList[1].text}
              onClick={startFindDIff}
            />
            <Planet
              style={{ right: "3%" }}
              id={"planet3"}
              min={5}
              max={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
