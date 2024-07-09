import "./Profile.css";
import Header from "../../components/game/Header";
import NewButton from "../../components/button/newButton";
import useUserStore from "../../store/user/useUserStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);
  const setNickname = useUserStore((state) => state.setNickname);
  const navigate = useNavigate();

  const [input, setInput] = useState({ nickname: "" });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      [name]: value,
    });
  };

  const onSubmitBtnClick = () => {
    setNickname(input);
    console.log(nickname);
    loginCreateRoom();
  };

  // 방장이 방 만들기
  const loginCreateRoom = async () => {
    try {
      const roomId = await axios({
        method: "POST",
        url: "http://localhost:8080/api/room",
        data: { roomUrl: window.location.href, userId: userId },
      });

      if (roomId.status === 200) {
        const res = await axios({
          method: "POST",
          url: `http://localhost:8080/api/room/${roomId.data}/join`,
          data: { roomUrl: window.location.href, userId: userId },
          roomId: roomId.data,
        });
        if (res.status === 200) {
          navigate(`/lobby/${roomId.data}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
                value={input.nickname}
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
