import './PlayerSidebar.css'
import Player from '../../components/lobby/Player.jsx'
import Button from '../../components/button/Button.jsx';
import RocketBtn from '../../components/button/RocketBtn.jsx';
import GameMode from '../../components/lobby/GameMode.jsx';

const PlayerSidebar = () => {
  return (
    <div className="sidebar">
      {/* <img className="rocket-board" src='/images/game/rocket-board.png' alt="rocket-board" /> */}

      <div className="title-section">
        Player
      </div>

      <div className="player-section">
        <Player />
        <Player />
        <Player />
        <Player />
      </div>
      {/* <div className="invite-section">

      </div> */}
    </div>
  )
}

export default PlayerSidebar;