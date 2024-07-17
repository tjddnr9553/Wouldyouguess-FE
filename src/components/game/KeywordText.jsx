import "./KeywordText.css";

const KeywordText = ({ text }) => {
  return (
    <div className="keywordTextContainer">
      <div className="keywordText">{text}</div>
      <div className="keywordText">{text}</div>
      <div className="keywordText">{text}</div>
    </div>
  );
};
export default KeywordText;
