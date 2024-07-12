import './Player.css'
import styled from 'styled-components';

const Player = ({nickname, username}) => {
  return (
    <div className='player'>
      <div className="wrap">
        <div className="aurora-base aurora-one"></div>
        <div className="aurora-base aurora-two"></div>
        <div className="aurora-base aurora-three"></div>
      </div>
      <div className="profile-section">
        <Profile />
      </div>
      <div className="name-section">
        <h1 className='nickname'>{nickname}</h1>
        <p className="user-description">{username}</p>
      </div>
    </div>
  )
}

export default Player;

const Profile = styled.div`
  background-image: url('/images/characters/astronaut-soccer.png');
  width: 100%;
  height: 100%;
  background-size:contain;
  background-repeat: no-repeat;
  border-radius: 50%;
`