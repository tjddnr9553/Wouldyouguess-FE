import styled from "styled-components";
import './Timer.css'
import { useEffect } from "react";
import ClockStyleCountdownTimer from "../ClockStyleCountdownTimer";

const Timer = () => {

  return (
    <>
      <div className="timer">
        <div className="clock">
          <img className="mars" src="/images/clock-planet.png" alt="mars" />
        </div>
      </div>

      {/* <ClockStyleCountdownTimer /> */}
    </>
  )
}

export default Timer;
