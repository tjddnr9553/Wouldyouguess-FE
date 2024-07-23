import "./ModalKeyword.css";

const ModalKeyword = ({ keyword }) => {
  return (
    <div className="modalKeyword-container">
      <div className="background-img">
        <div className="box">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="modalKeyword-content">
            <div className="modalKeyword-content-title">키 워 드</div>
            <div className="modalKeyword-content-text">{keyword}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalKeyword;