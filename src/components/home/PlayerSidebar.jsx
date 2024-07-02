import './PlayerSidebar.css'
import Player from './Player'
import Button from '../Button/Button';

const PlayerSidebar = () => {
  return (
    <div className="sidebar">
      <div className="title-section">
        <h1 className='title'>플레이어</h1>
      </div>
      <div className="player-section">
        <Player />
        <Player />
        <Player />
        <Player />
      </div>
      <div className="invite-section">
        <Button text={"친구 초대하기"} />
      </div>
    </div>
  )
}

export default PlayerSidebar;