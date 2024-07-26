import "./ImageLoading.css";

const ImageLoading = () => {
  return (
    <video
      src="/images/game/game2/imageLoading.mp4"
      muted
      autoPlay
      loop
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ImageLoading;
