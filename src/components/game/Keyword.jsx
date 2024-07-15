import "./Keyword.css";

const Keyword = ({ text }) => {
  return (
    <div className="keyword-container">
      {/* <div className="keyword-title"&emsp;</div> */}
      <div className="keyword-content">{text}</div>
    </div>
  );
};
export default Keyword;
