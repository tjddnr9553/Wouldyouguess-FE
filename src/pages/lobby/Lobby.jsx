import {useNavigate} from "react-router-dom";

import "./Lobby.css";
import PlayerSidebar from "./PlayerSidebar.jsx";
import Planet from "../../components/game/Planet.jsx";
import Header from "../../components/game/Header.jsx";
import useSocketStore from "../../store/socket/useSocketStore.js";
import {io} from "socket.io-client";
import {useEffect} from "react";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";

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

  const {userId, isInvited} = useUserStore();
  const {roomId} = useRoomStore();
  const {socket, setSocket} = useSocketStore();

  useEffect(() => {
    const socketConnect = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(socketConnect);

    socketConnect.on("connect",() => {
      if (isInvited) {
        socketConnect.emit("room_join", { roomId, userId });
      } else {
        socketConnect.emit("room_create", { roomId, userId });
      }
    });

    // 연결이 끊어졌을 때
    // socketConnect.on("disconnect", async (reason) => {
    //   socketConnect.emit("room_exit", { roomId, userId });
    //   await room_exit(roomId, userId);
    // });

    socketConnect.on("game_start", (data) => {
      console.log(data.gameId);
      navigate(`/test?gameId=${data.gameId}&round=1`);
    });

    socketConnect.on("room_join", (gameId) => {
        // room list 갱신 필요
    });


    return () => {
      // socketConnect.disconnect();
      socketConnect?.off("game_start", (data) => {
        navigate(`/test?gameId=${data.gameId}&round=1`);
      });
    };
  }, [setSocket]);

  const startCatchLiar = async () => {

    // const gameId = await catchLiar_start(roomId);
    const gameId = 321;
    socket.emit("game_start", { gameId } );
    navigate(`/test?gameId=${gameId}&round=1`);
  }

  return (
    <div className="inner">
      <div className="lobby container">
        <Header />

        <div className="content">
          <div className="side">
            <PlayerSidebar />
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
              onClick={() => navigate("/game2/upload")}
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
