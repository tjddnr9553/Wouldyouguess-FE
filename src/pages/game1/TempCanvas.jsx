import React, {useEffect, useRef, useState} from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import {useSearchParams} from "react-router-dom";
import useSocketStore from "../../store/socket/useSocketStore.js";

const TempCanvas = () => {
    const [searchParams] = useSearchParams();
    const socket = useSocketStore(state => state.socket);

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

    const handleGameJoin = () => {
        console.log("game_join 전송");
    }

    const handleGameTurnChange = () => {
        console.log("game_turn_change 전송");
    }

    useEffect(() => {
        socket?.on('drawer_draw_start', handleDrawStart);
        socket?.on('drawer_draw_move', handleDrawMove);
        socket?.on('game_join', handleGameJoin);
        socket?.on('game_turn_change', handleGameTurnChange);

        return () => {
            socket?.off("drawer_draw_start", handleDrawStart);
            socket?.off("drawer_draw_move", handleDrawMove);
            socket?.off("game_join", handleGameJoin);
            socket?.off("game_turn_change", handleGameTurnChange);
        };
    }, [handleDrawStart, handleDrawMove, handleGameJoin, handleGameTurnChange]);

    useEffect(() => {
        const turn = searchParams.get('turn');
        if (turn === '1') {
            socket.emit("game_join", "game_join_1");
        } else{
            socket.emit("game_turn_change", "game_turn_change_1");
        }
    }, [])

    return (
        <div>
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
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
        </div>
    );
}

export default TempCanvas;

