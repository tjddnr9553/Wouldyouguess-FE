import './Game1.css'

import User from "../../components/game/User.jsx";
import Tools from "./Tools.jsx"
import Drawing from "./Drawing.jsx"
import Timer from "../../components/game/Timer.jsx"
import Palette from "./Palette.jsx"

const Game1 = () => {



  return(
      <div className="inner">
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
      </div>
  )
}

export default Game1;