import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {catchLiar_vote, catchLiar_vote_candidates} from "../../../api/game/CatchLiar.js";

const Game1_vote = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [votedUserList, setVotedUserList] = useState([]);

    useEffect(async () => {
        const gameId = Number(searchParams.get('gameId'));
        const candidateList = await catchLiar_vote_candidates(gameId);
        setVotedUserList(candidateList);
    }, [setVotedUserList])

    const voteLiar = async (votingUserId) => {
        const gameId = Number(searchParams.get('gameId'));
        await catchLiar_vote(gameId, votingUserId);

        navigate(`/game1/result?gameId=${gameId}`);
    }

    return (
        <>
            <h1>game1의 투표 페이지</h1>
            {votedUserList.map((user, index) => (
                <button key={index} onClick={() => voteLiar(user)}>
                    {user.name}에게 투표
                </button>
            ))}
        </>
    )
}

export default Game1_vote;