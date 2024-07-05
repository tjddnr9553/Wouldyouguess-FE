import './Game1.css'
import User from "../../components/game/User.jsx";
import Drawing from "./Drawing.jsx";
import Timer from "../../components/game/Timer.jsx";
import Palette from "./Palette.jsx";


const Game = () => {
  return(
      <div className="inner">
        <div className="game container">
          <div className="left-section">
            <User />
            <User />
            <User />
            <User />
          </div>
          <div className="center">
            <Drawing />
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