import './Player.css'
import styled from 'styled-components';

const Player = ({nickname, username, imgUrl}) => {
  return (
    <div className='player'>
      <div className="wrap">
        <div className="aurora-base aurora-one"></div>
        <div className="aurora-base aurora-two"></div>
        <div className="aurora-base aurora-three"></div>
      </div>
      <div className="profile-section">
        <Profile imgUrl={imgUrl}/>
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
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  width: 100%;
  height: 100%;
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
`