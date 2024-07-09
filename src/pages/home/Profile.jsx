import './Profile.css'
import Header from '../../components/game/Header';
import NewButton from '../../components/button/newButton';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [input, setInput] = useState({
    nickname: "",
  });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      [name] : value,
    })
  }

  const onSubmitBtnClick = () => {
    localStorage.setItem('nickname', input.nickname);
  };

  return (
    <div className='profile container'>
      <Header />
      <div className="content-section">
        <div className="center">
          <div className="content">
            <div className="profile-section left">
              <div className="profile-img">
                <img src="/images/characters/1.png" alt="character" />
              </div>
              <NewButton className="change-btn btn" text={'Change'} />
            </div>

            <div className="input-section right">
              <p> Nickname </p>
              <input 
                type= "text"
                name='nickname'
                value= {input.nickname} 
                onChange={onChangeInput}
              />
              <NewButton className="complete-btn btn" text={'Next'} onClick={onSubmitBtnClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
