import { useEffect, useRef,useState } from 'react';
import './Clock.css'
import Counter from './Counter';
import useSocketStore from "../../store/socket/useSocketStore.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";

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
  const { gameId } = useCatchLiarStore();

  const handleTransitionEnd = () => {
    setShowLeftClock(true);
    setShowRightClock(false);
    setShowHiddenImg(true);
  }

  const handleLeft = () => {
    setIsDoneLeft(true);
  }

  const handleCountdownComplete = () => {
    if (round < 5) {
      socket?.emit("game_turn_change", { gameId, round });
      navigate(`/game1?gameId=${gameId}&round=${round + 1}`)
    } else {
      socket?.emit("game_end", { round });
      navigate(`/game1/vote`)
    }
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
    socket?.on("game_turn_change", (data) => {
      const {gameId, round} = data;
      navigate(`/game1?gameId=${gameId}&round=${round + 1}`)
    });

    socket?.on("game_end", (data) => {
      const { round } = data;
      navigate(`/game1/vote`)
    });

    return () => {
      socket?.off("game_turn_change", (data) => {
        console.log(data)
      });
      socket?.off("game_end", (data) => {
        console.log(data)
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