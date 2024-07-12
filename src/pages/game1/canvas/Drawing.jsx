import './Drawing.css'
import { useEffect, useRef, useState } from 'react';
import {Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE} from './tools';
import { useCanvasStore } from '../../../store/canvas/useCanvasStore';
import useSocketStore from "../../../store/socket/useSocketStore.js";
import useCatchLiarStore from "../../../store/game/useCatchLiarStore.js";
import useRoomStore from "../../../store/room/useRoomStore.js";

const toolsMap = {
    [TOOL_PENCIL]: Pencil,
    [TOOL_LINE]: Line,
    [TOOL_RECTANGLE]: Rectangle,
    [TOOL_ELLIPSE]: Ellipse
  };

const Drawing = ({width, height}) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const toolRef = useRef(null);
    let isClick = false;

    const { socket } = useSocketStore();
    const { tool, color, size, fillColor , setTool} = useCanvasStore();
    const { roomId } = useRoomStore();
    const { isDrawing } = useCatchLiarStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext('2d');
    }, []);

    useEffect(() => {
        initTool(tool);
    }, [tool]);

    useEffect(() => {
        socket?.on('drawer_draw_start', handleDrawStart);
        socket?.on('drawer_draw_move', handleDrawMove);

        return () => {
            socket?.off("drawer_draw_start", handleDrawStart);
            socket?.off("drawer_draw_move", handleDrawMove);
        };
    }, [socket]);

    const initTool = (tool) => {
        if (tool === 'clear') {
            ctxRef.current.clearRect(0, 0, width, height);
            return ;
        }
        toolRef.current = toolsMap[tool](ctxRef.current);
    }

    const getCursorPosition = (e) => {
        const {top, left} = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - left,
            y: e.clientY - top
        }
    }

    // 인자가 필요 없을 경우?
    const onMouseDown = (e) => {
        isClick = true;
        const {x, y} = getCursorPosition(e);
        console.log("onMouseDown : ", x, y);
        tool === TOOL_PENCIL ?
            toolRef.current.onMouseDown(x, y, color, size) :
            toolRef.current.onMouseDown(x, y, color, size, fillColor);
        socket?.emit('drawer_draw_start', { tool, xAxis: x, yAxis: y, color, size, fillColor, roomId });
    }

    const onMouseUp = (e) => {
        isClick = false;
        const {x, y} = getCursorPosition(e);
        console.log("onMouseUp : ", x, y);
        toolRef.current.onMouseUp(x, y);
    }

    const onMouseMove = (e) => {
        if (!isClick) return;
        const {x, y} = getCursorPosition(e);
        console.log("onMouseMove : ", x, y);
        toolRef.current.onMouseMove(x, y);
        socket?.emit('drawer_draw_move', { tool, xAxis: x, yAxis: y, color, size, fillColor, roomId });
    }

    const handleDrawStart = (data) => {
        console.log(data);
        const {tool, xAxis, yAxis, color, size, fillColor} = data;

        setTool(tool);
        tool === TOOL_PENCIL ?
            toolRef.current.onMouseDown(xAxis, yAxis, color, size) :
            toolRef.current.onMouseDown(xAxis, yAxis, color, size, fillColor);
    }

    const handleDrawMove = (data) => {
        console.log(data);
        const {tool, xAxis, yAxis, color, size, fillColor} = data;
        toolRef.current.onMouseMove(xAxis, yAxis);
    }

    return (
        <>
            <canvas
                width={width}
                height={height}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            />
            
        </>
    );
}

export default Drawing;