import styled from "styled-components";

const Timer = () => {
  return (
    <div className="timer">
      <Temp />
    </div>
  )
}

export default Timer;

const Temp = styled.div`
  background-color: gray;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
`