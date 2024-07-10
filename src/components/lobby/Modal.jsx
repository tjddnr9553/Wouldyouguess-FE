import { useRef } from "react";
import "./Modal.css";
const Modal = ({ text }) => {
  const roomUrl = useRef(null);
  const copyText = () => {
    navigator.clipboard.writeText(roomUrl.current.value);

    alert("링크 복사 완료!");
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">Copy Your Link!</div>
        <div className="actions">
          <input
            type="text"
            className="button upload-btn"
            value={text}
            ref={roomUrl}
            readOnly
          />
        </div>
        <button className="copy" onClick={copyText}>
          <div className="copy-link">복사하기</div>
        </button>
      </div>
    </div>
  );
};
export default Modal;
