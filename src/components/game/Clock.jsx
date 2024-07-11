import { useEffect, useRef,useState } from 'react';
import './Clock.css'
import Counter from './Counter';
import useSocketStore from "../../store/socket/useSocketStore.js";
import {useNavigate, useSearchParams} from "react-router-dom";

const Clock = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showLeftClock, setShowLeftClock] = useState(false);
  const [showRightClock, setShowRightClock] = useState(true);
  const [showHiddenImg, setShowHiddenImg] =useState(false);
  const [isDoneLeft, setIsDoneLeft] = useState(false);

  const semicircleRef = useRef(null);
  const semicircleLeftRef = useRef(null);

  const { socket } = useSocketStore();

  const handleTransitionEnd = () => {
    setShowLeftClock(true);
    setShowRightClock(false);
    setShowHiddenImg(true);
  }

  const handleLeft = () => {
    setIsDoneLeft(true);
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
      console.log(data);
    });

    socket?.on("game_end", (data) => {
      console.log(data);
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

  const handleCountdownComplete = () => {
    const round = Number(searchParams.get('round'));

    if (round < 5) {
      socket?.emit("game_turn_change", { round });
      navigate(`/game1?round=${round + 1}`)
    } else {
      socket?.emit("game_end", { round });
      navigate(`/game1/result`)
    }
  }

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
        <Counter countDown={30} onCountdownComplete={handleCountdownComplete} />
      </div>
    </>
  )
}

export default Clock;