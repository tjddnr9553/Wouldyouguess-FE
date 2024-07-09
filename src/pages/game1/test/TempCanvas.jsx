import React, {useEffect, useRef, useState} from 'react';
import {Layer, Line, Stage, Text, Rect} from 'react-konva';
import {useNavigate, useSearchParams} from "react-router-dom";
import useSocketStore from "../../../store/socket/useSocketStore.js";
import useRoomStore from "../../../store/room/useRoomStore.js";
import useUserStore from "../../../store/user/useUserStore.js";
import {catchLiar_info} from "../../../api/game/CatchLiar.js";

const TempCanvas = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const socket = useSocketStore(state => state.socket);
    const { roomUsers } = useRoomStore();
    const [isLiar, setIsLiar] = useState(false);

    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);



    const handleMouseDown = (e) => {    // click
        isDrawing.current = true;
        const point = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [point.x, point.y] }]);
        socket.emit("drawer_draw_start", { tool, points: [point.x, point.y] });
    };

    const handleMouseUp = () => {   // click 해제
        isDrawing.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
        socket.emit("drawer_draw_move", { points: {x : point.x, y : point.y }});
    };

    const handleDrawStart = (data) => {
        setLines([...lines, data]);
    }

    const handleDrawMove = (data) => {
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([ data.points['x'], data.points['y'] ]);   // add point
        lines.splice(lines.length - 1, 1, lastLine);                        // replace last
        setLines(lines.concat());
    }

    // 다음 사람 턴으로 이동하거나 결과 창
    const nextTurnOrResult = () => {
        const round = Number(searchParams.get('round'));
        const gameId = Number(searchParams.get('gameId'));

        if (round < roomUsers.length) {
            // 1. drawer와 watchers의 결정


            // 2. 사진 저장 로직도 들어가야함 -> 비동기로


            // 3. socket으로 다음 drawer, wachers를 전송
            socket.emit("game_round_change",{gameId, round : round + 1});
            setLines([]);
            navigate(`/test?gameId=${gameId}&round=${round + 1}`)
        } else {

            navigate(`/game1/vote?gameId=${gameId}`);
        }
    }


    useEffect(() => {
        socket?.on("game_round_change", (data) => {
            setLines([]);
            navigate(`/test?gameId=${data.gameId}&round=${data.round}`)
        });
        socket?.on('drawer_draw_start', handleDrawStart);
        socket?.on('drawer_draw_move', handleDrawMove);

        return () => {
            socket?.off("game_turn_change", (data) => {
                setLines([]);
                navigate(`/test?gameId=${data.gameId}&round=${data.round}`)
            });
            socket?.off("drawer_draw_start", handleDrawStart);
            socket?.off("drawer_draw_move", handleDrawMove);
        };
    }, [handleDrawStart, handleDrawMove]);

    // useEffect(async () => {
    //     const gameId = Number(searchParams.get('gameId'));
    //     const round = Number(searchParams.get('round'));
    //
    //     const reponse = await catchLiar_info(gameId, userId, round);
    // },[])



    const tempStyle = {
        marginLeft: '20px',
        width: '100px',
        height: '30px'
    };

    const tempStyle2  = {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '30px'
    }

    return (
        <div>
            <div>
                <select value={tool} onChange={(e) => setTool(e.target.value)}>
                    <option value="pen">Pen</option>
                    <option value="eraser">Eraser</option>
                </select>
                <button onClick={nextTurnOrResult} style={tempStyle}>다음 턴</button>
                <br /><br /><br />
                <h2 style={tempStyle2}>
                    당신이 그릴 차례입니다.
                    <br /><br />
                    당신의 제시어 :
                </h2>
            </div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
            >
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        fill="white"
                    />
                    <Text text="Just start drawing" x={5} y={30} />
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#df4b26"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                </Layer>
            </Stage>

        </div>
    );
}

export default TempCanvas;

