import { useEffect, useRef } from 'react';
import './Canvas.css'
import { useCanvasStore} from '../../../store/game/useGameStore';

const Canvas = () => {
  const {canvasWrapperWidth, canvasWrapperHeight, mode, setX, setY} = useCanvasStore();

  const canvasRef = useRef(null);
  const contextRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, [])

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const clickCanvas = (e) => {
    contextRef.current.clearRect(0, 0, canvasWrapperWidth, canvasWrapperHeight);
    const { x, y } = getCursorPosition(e);
    
    if (mode === 'upload') {
      const length = 100;
      contextRef.current.strokeRect(x - length / 2, y - length / 2, length, length);
    } 
    
    setX(x);
    setY(y);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
        }}
        width={canvasWrapperWidth}
        height={canvasWrapperHeight}
        onMouseDown={clickCanvas}
      />
    </>
  )
}

export default Canvas;