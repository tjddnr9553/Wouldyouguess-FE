import './Clock.css'
import {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import Counter from './Counter';
import {catchLiar_image_upload} from "../../api/game/CatchLiar.js";

import useSocketStore from "../../store/socket/useSocketStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import {useCanvasStore} from "../../store/canvas/useCanvasStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useUserStore from "../../store/user/useUserStore.js";

const Clock = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get('round'));

  const [showLeftClock, setShowLeftClock] = useState(false);
  const [showRightClock, setShowRightClock] = useState(true);
  const [showHiddenImg, setShowHiddenImg] =useState(false);
  const [isDoneLeft, setIsDoneLeft] = useState(false);

  const semicircleRef = useRef(null);
  const semicircleLeftRef = useRef(null);

  const { socket } = useSocketStore();
  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { canvas } = useCanvasStore();
  const { gameId, isDrawing, totalRound, setImageKey, setImagePath } = useCatchLiarStore();

  const handleTransitionEnd = () => {
    setShowLeftClock(true);
    setShowRightClock(false);
    setShowHiddenImg(true);
  }

  const handleLeft = () => {
    setIsDoneLeft(true);
  }

  const handleCountdownComplete = async () => {
    if (!isDrawing) return ;

    await canvas.toBlob( async (blob) => {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('catchLiarGameId', gameId);
      formData.append('file', blob, 'image.png');

      const res = await catchLiar_image_upload(formData);
      setImageKey(res.imageKey);
      setImagePath(res.imagePath);

      if (round < totalRound) {
        socket?.emit("game_round_change", { roomId, gameId, round });
      } else {
        socket?.emit("game_end", { roomId });
      }
    }, 'image/png');
  }

  useEffect(() => {
    const semicircle = semicircleRef.current;
    semicircle.addEventListener('animationend', handleTransitionEnd);

    const semicircleL = semicircleLeftRef.current;
    semicircleL.addEventListener('animationend', handleLeft);

    return () => {
      semicircle.removeEventListener('animationend', handleTransitionEnd);
    };
  }, [])

  useEffect(() => {
    socket?.on("game_round_change", (data) => {
      const { gameId, round } = data;
      navigate(`/game1?gameId=${gameId}&round=${round + 1}`)
    });

    socket?.on("game_end", () => {
      navigate(`/game1/vote`)
    });

    return () => {
      socket?.off("game_round_change", (data) => {
        const { gameId, round } = data;
        navigate(`/game1?gameId=${gameId}&round=${round + 1}`)
      });

      socket?.off("game_end", () => {
        navigate(`/game1/vote`)
      });
    }
  }, [socket])


  return (
    <>
      <div className="clock main-container">
        <div className="circle-container">
          <div 
            ref={semicircleLeftRef}
            style={{ display: isDoneLeft ? 'none' : 'block' }} 
            className={`semicircle left-circle ${showLeftClock ? 'show' : ''}`}></div>
          <div 
            ref={semicircleRef} 
            style={{ display: showRightClock ? 'block' : 'none' }}  
            className="semicircle right-circle"></div> 
          <div
            style={{display : showHiddenImg ? 'block' : 'none'}} 
            className="hidden-img"></div>
        </div>
        <Counter countDown={10} onCountdownComplete={handleCountdownComplete} />
      </div>
    </>
  )
}

export default Clock;