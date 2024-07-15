import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Game2_Music = () => (
  <AudioPlayer
    autoPlay={true}
    src="/bgm/Game2_bgm.mp3"
    style={{ display: "none" }}
    preload={"auto"}
    loop={true}
    volume={0.4}
  />
);
export default Game2_Music;
