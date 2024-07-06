import './Player.css'
import styled from 'styled-components';

const Player = () => {
  return (
    <div className='player'>
      <div className="profile-section">
        <Profile />
      </div>
      <div className="name-section">
        <p className='nickname'> 몽땅 연필 </p>
      </div>
    </div>
  )
}

export default Player;

const Profile = styled.div`
  background-image: url('/images/player_img.png');
  width: 50px;
  height: 50px;
  background-size:contain;
  background-repeat: no-repeat;
  border-radius: 50%;
`