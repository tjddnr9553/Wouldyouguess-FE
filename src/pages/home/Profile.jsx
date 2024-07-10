import "./Profile.css";
import Header from "../../components/game/Header";
import NewButton from "../../components/button/newButton";
import useUserStore from "../../store/user/useUserStore";
import { useState } from "react";
import {update_nickname} from "../../api/oauth/User.js";
import {useNavigate} from "react-router-dom";
import useRoomStore from "../../store/room/useRoomStore.js";
import {room_create, room_join} from "../../api/home/Room.js";

const Profile = () => {
  const navigate = useNavigate();

  const inviteRoomId = localStorage.getItem("inviteRoomId");
  const isInvited = localStorage.getItem("isInvited") === "true";


  const [inputNick, setInputNick] = useState("" );
  const { userId, setNickname } = useUserStore();
  const { setRoomId } = useRoomStore();


  const onChangeInput = (e) => {
    let value = e.target.value;
    setInputNick(value);
  };

  const onSubmitBtnClick = async () => {
    const response = await update_nickname(userId, inputNick);
    setNickname(response.nickname);

    const roomId = isInvited ? await room_join(userId, inviteRoomId) : await room_create(userId);
    setRoomId(roomId);
    window.localStorage.removeItem("isInvited");
    navigate(`/lobby/${roomId}`);
  };

  return (
    <div className="profile container">
      <Header />
      <div className="content-section">
        <div className="center">
          <div className="content">
            <div className="profile-section left">
              <div className="profile-img">
                <img src="/images/characters/1.png" alt="character" />
              </div>
              <NewButton className="change-btn btn" text={"Change"} />
            </div>

            <div className="input-section right">
              <p> Nickname </p>
              <input
                type="text"
                name="nickname"
                value={inputNick.nickname}
                onChange={onChangeInput}
              />
              <NewButton
                className="complete-btn btn"
                text={"Next"}
                onClick={onSubmitBtnClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
