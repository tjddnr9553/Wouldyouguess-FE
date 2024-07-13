import {useNavigate, useSearchParams} from "react-router-dom";
import useSocketStore from "../../../store/socket/useSocketStore.js";
import useRoomStore from "../../../store/room/useRoomStore.js";
import {useEffect} from "react";
import {catchLiar_result} from "../../../api/game/CatchLiar.js";
import useUserStore from "../../../store/user/useUserStore.js";

const Game1_result = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { socket } = useSocketStore();
    const { userId } = useUserStore();
    const { roomId } = useRoomStore();

    useEffect(async () => {
        const gameId = Number(searchParams.get('gameId'));
        const votedResult = await catchLiar_result(gameId, userId);
    }, [])


    const gameEnd = () => {
        const gameId = Number(searchParams.get('gameId'));

        socket.emit("game_end", { gameId });
        navigate(`/lobby`);
    }

    return (
        <>
            <h1>game1의 결과 페이지</h1>
            <button onClick={gameEnd}>로비로 돌아가기</button>
        </>
    )
}

export default Game1_result;