import "./NewButton.css";

const NewButton = ({ text, ...props }) => {
  return (
    <button className="btn" {...props}>
      <strong>{text}</strong>
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
