import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Game1_Music = () => (
  <AudioPlayer
    autoPlay={true}
    src="/bgm/Game1_bgm.mp3"
    style={{ display: "none" }}
    preload={"auto"}
    loop={true}
    volume={0.15}
  />
);
export default Game1_Music;
