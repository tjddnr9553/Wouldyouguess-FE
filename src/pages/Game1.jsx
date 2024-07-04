import './Game1.css'

import User from "../components/Game/User";
import Tools from "../components/Game/Tools"
import Drawing from "../components/Game/Drawing"
import Timer from "../components/Game/Timer"
import Palette from "../components/Game/Palette"

const Game = () => {
  return(
    <div className="game">
      <div className="container">
        <div className="left-section">
          <User />
          <User />
          <User />
          <User />
        </div>
        <div className="center">
          <Drawing />
          <Tools />
        </div>
        <div className="right-section">
          <Timer />
          <Palette />
          <button className="quite-btn">DONE</button>
        </div>
      </div>
    </div>

  )
}

export default Game;