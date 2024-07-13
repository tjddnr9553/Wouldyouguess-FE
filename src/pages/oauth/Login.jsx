import "./Login.css";
import Header from "../../components/game/Header";
import NewButton from "../../components/button/newButton";
import useUserStore from "../../store/user/useUserStore";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useRoomStore from "../../store/room/useRoomStore.js";
import {room_create, room_join} from "../../api/home/Room.js";
import {temp_login} from "../../api/oauth/Oauth.js";

const Login = () => {
    const inviteRoomId = localStorage.getItem("inviteRoomId");
    const isInvited = localStorage.getItem("isInvited") === "true";

    const navigate = useNavigate();

    const [input, setInput] = useState({ username: "", nickname: ""} );

    const { setNickname, setUserId, setUsername, setIsLogin, setIsInvite } = useUserStore();
    const { setRoomId } = useRoomStore();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const onSubmitBtnClick = async () => {
        const response = await temp_login(input.username, input.nickname);
        const userId = response.user_id;

        setUserId(userId);
        setNickname(response.nickname);
        setUsername(response.username);
        setIsLogin(true);
        setIsInvite(isInvited);
        const roomId = isInvited ? await room_join(userId, inviteRoomId) : await room_create(userId);
        setRoomId(roomId);
        window.localStorage.removeItem("inviteRoomId");
        window.localStorage.removeItem("isInvited");
        navigate(`/lobby/${roomId}`);
    };

    return (
        <div className="profile container">
            <Header />
            <div className="content-section">
                <div className="center">
                    <div className="content">
                        <div className="input-section right">
                            <p> Username </p>
                            <input
                                type="text"
                                name="username"
                                value={input.username}
                                onChange={onChangeInput}
                            />
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

export default Login;
