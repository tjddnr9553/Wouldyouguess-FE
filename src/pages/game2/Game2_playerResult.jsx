import "./Game2_playerResult.css";

const Game2_playerResult = ({ player, nickname, score }) => {
  return (
    <div className="game2-result">
      <div className="playerResult">
        <div className="leftItem">{player}위</div>
        <div className="nickname">
          <div>
            <p>{nickname}</p>
          </div>
        </div>
        <div className="originScore">{score}</div>
      </div>
    </div>
  );
};

export default Game2_playerResult;
