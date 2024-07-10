import './Drawing.css'
import { useEffect, useRef, useState } from 'react';
import {Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE} from './tools';
import { useCanvasStore } from '../../../store/canvas/useCanvasStore';

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
    const {tool, color, size, fillColor} = useCanvasStore();
    
    useEffect(() => { 
        const canvas = canvasRef.current;
        ctxRef.current = canvas.getContext('2d');
    }, [])

    useEffect(() => {
        initTool(tool);
    }, [tool])

    const initTool = (tool) => {
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
        const {x, y} = getCursorPosition(e);
        toolRef.current.onMouseDown(x, y, color, size, fillColor);
    }

    const onMouseUp = (e) => {
        const {x, y} = getCursorPosition(e);
        toolRef.current.onMouseUp(x, y);
    }

    const onMouseMove = (e) => {
        const {x, y} = getCursorPosition(e);
        toolRef.current.onMouseMove(x, y);
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