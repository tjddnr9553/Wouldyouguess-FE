import "./Keyword.css";

const Keyword = ({ keyword }) => {
  return (
    <div className="keyword-container">
      <div className="background-img">
        <div className="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="keyword-content">
            <div className="keyword-content-title">키 워 드</div>
            <div className="keyword-content-text">{keyword}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Keyword;
