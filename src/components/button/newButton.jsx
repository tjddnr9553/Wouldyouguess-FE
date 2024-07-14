import "./NewButton.css";

const NewButton = ({ text, count, onClick, ...props }) => {
  return (
    <button className="btn" {...props} onClick={onClick}>
      <strong>{Array.from({ length: count }, (_, index) => (text))}</strong>
      <div id="container-stars">
        <div id="stars"></div>
      </div>
      <div id="glow">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </button>
  );
};
export default NewButton;
