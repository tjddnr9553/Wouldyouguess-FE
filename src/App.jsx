import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { useEffect } from "react";
import "./App.css";

import Lobby from "./pages/lobby/Lobby.jsx";
import Game1 from "./pages/game1/Game1.jsx";
import Home from "./pages/home/Home.jsx";
import Game2 from "./pages/game2/Game2.jsx";
import Game2_upload from "./pages/game2/Game2_upload.jsx";
import Game2_remember from "./pages/game2/Game2_remember.jsx";
import Game2_result from "./pages/game2/Game2_result.jsx";
import Game3 from "./pages/game3/Game3.jsx";
import Result from "./pages/game1/Result.jsx";
import Login from "./pages/oauth/Login.jsx";
import Loading from "./components/loading/Loading.jsx";
import Profile from "./pages/home/Profile.jsx";
import LoginHandler from "./pages/oauth/LoginHandler.jsx";
import { KAKAO_AUTH_URL } from "./api/oauth/Oauth.js";
import Vote from "./pages/game1/Vote.jsx";
import useWebrtcStore from "./store/webrtc/useWebrtcStore.tsx";
import useAudioStore from "./store/bgm/useAudioStore.js";
import Game1_Music from "./components/bgm/Game1_Music.jsx";
import Game2_Music from "./components/bgm/Game2_Music.jsx";
import LobbyMusic from "./components/bgm/LobbyMusic.jsx";
import LaserPointer from "./pages/game1/LaserPointer.jsx";
import Result_Music from "./components/bgm/Result_Music.jsx";

function App() {
  const nav = useNavigate();
  const VITE_LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
  const VITE_SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
  const { setLIVEKIT_URL, setAPPLICATION_SERVER_URL } = useWebrtcStore();
  const { isPlaying, currentTrack } = useAudioStore();

  useEffect(() => {
    setLIVEKIT_URL(VITE_LIVEKIT_URL);
    setAPPLICATION_SERVER_URL(VITE_SOCKET_SERVER_URL);

    const currentUrl = new URL(window.location.href);
    const urlPaths = currentUrl.pathname.split("/"); // URL 경로를 '/'로 분할
    const urlType = urlPaths[urlPaths.length - 2]; // 마지막에서 두 번째 요소 가져오기
    const inviteRoomId = urlPaths[urlPaths.length - 1]; // 마지막 요소 가져오기
    if (urlType === "invite") {
      window.localStorage.setItem("inviteRoomId", inviteRoomId);
      window.localStorage.setItem("isInvited", "true");
      nav("/temp/login");
      // window.location.href = KAKAO_AUTH_URL;
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      {isPlaying && currentTrack === "/bgm/bgm.mp3" && <LobbyMusic />}
      {isPlaying && currentTrack === "/bgm/Game1_bgm.mp3" && <Game1_Music />}
      {isPlaying && currentTrack === "/bgm/Game2_bgm.mp3" && <Game2_Music />}
      {isPlaying && currentTrack === "/bgm/Result_bgm.mp3" && <Result_Music />}
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby/:roomUrl" element={<Lobby />} />

        <Route path="/game1" element={<Game1 />} />
        <Route path="/game1/vote" element={<Vote />} />
        <Route path="/game1/result" element={<Result />} />

        <Route path="/game2" element={<Game2 />} />
        <Route path="/game2/upload" element={<Game2_upload />} />
        <Route path="/game2/remember" element={<Game2_remember />} />
        <Route path="/game2/result" element={<Game2_result />} />

        <Route path="/game3" element={<Game3 />} />
        <Route path="/result" element={<Result />} />
        <Route path="/loading" element={<Loading />} />

        <Route path="/auth/kakao/callback" element={<LoginHandler />} />
        <Route path="/temp/login" element={<Login />} />

        <Route path="/laser" element={<LaserPointer />} />
      </Routes>
    </>
  );
}

export default App;
