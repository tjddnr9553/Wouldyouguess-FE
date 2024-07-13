import './Result.css'
import PlayerResult from '../../components/game/PlayerResult';

const dummy = [
    {
        nickname: 'king 쾅윤',
        score: 0,
        liar: true,
        isWinner: false,
    },
    {
        nickname: 'GOOD 성욱',
        score: 10,
        liar: false,
        isWinner: true,
    },
    {
        nickname: 'OS 신',
        score: 10,
        liar: false,
        isWinner: true,
    },
    {
        nickname: '97 PH-M',
        score: 0,
        liar: false,
        isWinner: false,
    }
]

const Result = () => {

    return(
        <div className="result inner">
            <div className="title">
                <strong>Result</strong>
            </div>
            <div className="player-list">
                {dummy.map((player, index) => (
                    <PlayerResult 
                        key={index} 
                        player={`Player${index+1}`} 
                        nickname={player.nickname} 
                        score={player.score}
                        liar_img={player.liar && <img src='/images/game/liar.png'/>}
                        isWinner={player.isWinner}
                    />
                ))}
            </div>
            <button className="homeBtn">HOME</button>
        </div>
    );
}

export default Result;