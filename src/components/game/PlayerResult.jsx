import "./PlayerResult.css";

const PlayerResult = ({ player, nickname, score, liar_img, isWinner }) => {
  return (
    <div className="game1-result">
      <div className={isWinner ? "win" : "lose"}>
        {isWinner ? <div>Win!</div> : <div>Lose..</div>}
      </div>
      <div className="playerResult">
        <div className="leftItem">{player}</div>
        <div className="nickname">
          <div>
            {liar_img && <div className="liar-icon">{liar_img}</div>}
            <p>{nickname}</p>
          </div>
        </div>
        <div className="originScore">{score}</div>
        {/* <div className="plusScore">{score}</div> */}
      </div>
    </div>
  );
};

export default PlayerResult;
