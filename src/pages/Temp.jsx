import Moon from "../components/game/Moon"
import GameMode from "../components/lobby/GameMode";
import './Temp.css'

const Temp = () => {
  return(
    <>
      <GameMode />
      <div className="temp-container">
        <div className="first"></div>
        <div className="second"></div>
        <div className="third"></div>
      </div>
    </>

  )
}

export default Temp;