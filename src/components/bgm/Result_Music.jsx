import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Result_Music = () => (
  <AudioPlayer
    autoPlay={true}
    src="/bgm/Result_bgm.mp3"
    style={{ display: "none" }}
    preload={"auto"}
    loop={true}
    volume={0.4}
  />
);
export default Result_Music;
