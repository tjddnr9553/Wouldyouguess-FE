import './Timer.css';
import {useEffect, useState} from "react";

const Timer = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <div className="galactic-phone-timer-screen">
        <div className="galactic-phone-timer-content">
          {formatTime(time)}
        </div>
      </div>
  );
}

export default Timer;
