import './PlayerSidebar.css'
import Player from '../../components/lobby/Player.jsx'
import useSocketStore from "../../store/socket/useSocketStore.js";
import {useEffect, useState} from "react";
import {room_users} from "../../api/home/Room.js";
import useRoomStore from "../../store/room/useRoomStore.js";

const PlayerSidebar = () => {
    const [players, setPlayers] = useState([]);

    const {roomId} = useRoomStore();
    const {socket} = useSocketStore();

    const sync_func = async (roomId) => {
        const roomUsers = await room_users(roomId);
        setPlayers(roomUsers);
    }


    useEffect(() => {
        sync_func(roomId);
    }, [])

    useEffect(() => {
        socket?.on("room_join", sync_func);

        return () => {
            socket?.off("room_join", sync_func);
        };
    }, [socket])


  return (
    <div className="sidebar">
      <div className="title-section">
        Player
      </div>

      <div className="player-section">
          {players.map((player, index) => (
              <Player key={index} username={player.username} nickname={player.nickname}/>
          ))}
      </div>
    </div>
  )
}

export default PlayerSidebar;