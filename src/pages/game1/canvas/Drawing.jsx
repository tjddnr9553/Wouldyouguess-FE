import './Drawing.css'
import { useEffect, useRef, useState } from 'react';
import {Pencil, TOOL_PENCIL, Clear, TOOL_CLEAR, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE} from './tools';
import { useCanvasStore } from '../../../store/canvas/useCanvasStore';

const ERASE = 'erase';

const toolsMap = {
    [TOOL_PENCIL]: Pencil,
    [TOOL_CLEAR]: Clear,
    [TOOL_RECTANGLE]: Rectangle,
    [TOOL_ELLIPSE]: Ellipse,
    [ERASE]: Pencil
  };

const Drawing = ({width, height}) => {
    
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const toolRef = useRef(null);
    const {tool, setTool, color, size, fillColor, clearBtnClick, setCanvas } = useCanvasStore();
    
    useEffect(() => { 
        const canvas = canvasRef.current;
        setCanvas(canvas);
        ctxRef.current = canvas.getContext('2d');
    }, [])
    
    useEffect(() => {
        clearCanvas();
    }, [clearBtnClick])


    const clearCanvas = () => {
        ctxRef.current.clearRect(0, 0, width, height);
    }

    useEffect(() => {
        initTool(tool);
        if(tool == ERASE) {
            ctxRef.current.strokeStyle = color;
        }
        if(tool == TOOL_CLEAR) {
            toolRef.current.clearCanvas(width, height);
            setTool(TOOL_PENCIL);
        }
    }, [tool])

    const initTool = (tool) => {
        console.log(tool);
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
        if(tool == TOOL_PENCIL){
            toolRef.current.onMouseDown(x, y, color, size);
        } else if (tool == ERASE) {
            toolRef.current.onMouseDown(x, y, 'white', size);
        } else {
            toolRef.current.onMouseDown(x, y, color, size, fillColor);
        }
        
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