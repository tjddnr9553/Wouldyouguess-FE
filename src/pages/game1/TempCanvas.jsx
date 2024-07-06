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
        console.log("mouse down");
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
        socket.emit("start_coordinates", { tool, points: [pos.x, pos.y] });
    };

    const handleMouseUp = () => {   // click 해제
        console.log("mouse up");
        isDrawing.current = false;
    };

    const handleMouseMove = (e) => {
        console.log("mouse move");
        // no drawing - skipping
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
        socket.emit("coordinates", lines);
    };

    const start_drawing = (data) => {
        setLines([...lines, data]);
    }

    const drawing = (data) => {
        const test = data[data.length - 1].points;
        console.log(test[test.length - 1], test[test.length - 2]);


        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([test[test.length - 2], test[test.length - 1]]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    }

    useEffect(() => {
        socket?.on('start_coordinates1', start_drawing);
        return () => {
            socket?.off("start_coordinates1", start_drawing);
        };
    }, [drawing]);

    useEffect(() => {
        socket?.on('coordinates1', drawing);
        return () => {
            socket?.off("coordinates1", drawing);
        };
    }, [drawing]);



    useEffect(() => {

        const turn = searchParams.get('turn');
        if (turn === 1) {
            socket.on("game_join", "game_join 전송")
        }

        return () => {
            socket?.off("game_join", "game_join 전송");
        }

    }, [])


    const changeLineWidth = (event) => {
        // setLineWidth(event.target.value);
    }



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

