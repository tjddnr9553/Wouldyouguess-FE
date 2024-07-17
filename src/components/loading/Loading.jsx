import './Loading.css'
import Star from '../background/Star';
import useSocketStore from "../../store/socket/useSocketStore.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Loading = ({text}) => {
    const navigate = useNavigate();
    const { socket } = useSocketStore();

    useEffect(() => {
        socket?.on("game_result", () => {
            navigate(`/game1/result`)
        });

        return () => {
            socket?.off("game_result", () => {
                navigate(`/game1/result`)
            });
        }
    }, [socket])

    return (
      <>
        <Star />
        <div className='loading content'>
          <div className="loading-title">{text}</div>
          <div data-js="astro" className="astronaut">
            <div className="head"></div>
            <div className="arm arm-left"></div>
            <div className="arm arm-right"></div>
            <div className="body">
                <div className="panel"></div>
            </div>
            <div className="leg leg-left"></div>
            <div className="leg leg-right"></div>
            <div className="schoolbag"></div>
          </div>

        </div>
      </>
    )
}

export default Loading;