import {Route, Routes} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import {useEffect} from "react";
import "./App.css";

import Lobby from "./pages/lobby/Lobby.jsx";
import Game1 from "./pages/game1/Game1.jsx";
import Home from "./pages/home/Home.jsx";
import Game2 from "./pages/game2/Game2.jsx";
import Game2_upload from "./pages/game2/Game2_upload.jsx";
import Game2_remember from "./pages/game2/Game2_remember.jsx";
import Game2_result from "./pages/game2/Game2_result.jsx";
import Game3 from "./pages/game3/Game3.jsx";
import Result from "./pages/result/Result.jsx";
import Login from "./pages/oauth/Login.jsx";
import Loading from "./components/loading/Loading.jsx";
import Game1_vote from "./pages/game1/test/Game1_vote.jsx";
import Game1_result from "./pages/game1/test/Game1_result.jsx";
import Profile from "./pages/home/Profile.jsx";
import LoginHandler from "./api/oauth/LoginHandler.jsx";
import {KAKAO_AUTH_URL} from "./api/oauth/Oauth.js";

function App() {

  // 초대 받은 사람은 여기서 분류
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const urlPaths = currentUrl.pathname.split("/");      // URL 경로를 '/'로 분할
    const urlType = urlPaths[urlPaths.length - 2];                  // 마지막에서 두 번째 요소 가져오기
    const inviteRoomId = urlPaths[urlPaths.length - 1];             // 마지막 요소 가져오기
    if (urlType === "invite") {
      window.localStorage.setItem("inviteRoomId", inviteRoomId);
      window.localStorage.setItem("isInvited", "true");
      console.log("초대받은 주소 : ", inviteRoomId);
      window.location.href = KAKAO_AUTH_URL;
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby/:roomUrl" element={<Lobby />} />

        <Route path="/game1" element={<Game1 />} />
        <Route path="/game1/vote" element={<Game1_vote />} />
        <Route path="/game1/result" element={<Game1_result />} />

        <Route path="/game2" element={<Game2 />} />
        <Route path="/game2/upload" element={<Game2_upload />} />
        <Route path="/game2/remember" element={<Game2_remember />} />
        <Route path="/game2/result" element={<Game2_result />} />

        <Route path="/game3" element={<Game3 />} />
        <Route path="/result" element={<Result />} />
        <Route path="/loading" element={<Loading />} />

        <Route path="/auth/kakao/callback" element={<LoginHandler />} />
      </Routes>
    </>
  );
}

export default App;
