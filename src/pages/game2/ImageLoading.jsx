import "./ImageLoading.css";

const ImageLoading = () => {
  const squareElements = Array.from({ length: 3 }, (_, index) => (
    <div className="square" key={index}>
      {Array.from({ length: 4 }, (_, i) => (
        <span style={{ "--i": i }} key={i} /> 
      ))}
    </div>
  ));

  return <div className="imageLoadContainer">{squareElements}</div>;
};

export default ImageLoading;