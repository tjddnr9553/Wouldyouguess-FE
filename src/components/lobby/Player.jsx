import './Player.css'
import styled from 'styled-components';

const Player = ({nickname, username}) => {
  const randomNumber = Math.floor(Math.random()*4 + 1);
  const imgUrl = `/images/astronaut/astronaut${randomNumber}.png`;

  return (
    <div className='player'>
      <div className="wrap">
        <div className="aurora-base aurora-one"></div>
        <div className="aurora-base aurora-two"></div>
        <div className="aurora-base aurora-three"></div>
      </div>
      <div className="profile-section">
        <Profile url = {imgUrl}/>
      </div>
      <div className="name-section">
        <h1 className='nickname'>{username}</h1>
        <p className="user-description">{nickname}</p>
      </div>
    </div>
  )
}

export default Player;

const Profile = styled.div`
  background-image: url('${props => props.url}');
  background-color: pink;
  width: 100%;
  height: 100%;

  background-size:contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
`