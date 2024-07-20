import "./AilenText.css";

const AilenText = ({ text }) => {
  return (
    <div className="alienTextContainer">
      <div className="alienText">{text}</div>
      <div className="alienText">{text}</div>
      <div className="alienText">{text}</div>
    </div>
  );
};
export default AilenText;
