import {useNavigate} from "react-router-dom";

import "./Lobby.css";
import PlayerSidebar from "./PlayerSidebar.jsx";
import Planet from "../../components/game/Planet.jsx";
import Header from "../../components/game/Header.jsx";
import useSocketStore from "../../store/socket/useSocketStore.js";
import {io, Socket} from "socket.io-client";
import {useEffect, useRef} from "react";
import {room_create} from "../../api/home/Room.js";

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

  const setSocket = useSocketStore(state => state.setSocket);

  useEffect(() => {
    const socketConnect = io(import.meta.env.VITE_SOCKET_SERVER_URL);
    setSocket(socketConnect);

    socketConnect.on("connect",() => {
      socketConnect.emit("room_create", "roomId & userId 넘길 예정임!");
    });

    // return () => {
    //   socketConnect.disconnect();
    // };
  }, [setSocket]);



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
              // onClick={() => navigate("/game1")}
              onClick={() => navigate("/test")}
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
