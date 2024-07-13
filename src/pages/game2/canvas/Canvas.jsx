import { useEffect, useRef } from 'react';
import './Canvas.css'

const Canvas = ({width, height}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef();

  useEffect(() => {
    console.log('캔버스 리렌더링');
  }, )

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
    contextRef.current.clearRect(0, 0, width, height);
    const { x, y } = getCursorPosition(e);
 
    const length = 100;
    contextRef.current.strokeRect(x - length / 2, y - length / 2, length, length);
  }

  useEffect(() => {
    if(canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }, [width, height])

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
        onMouseDown={clickCanvas}
      />
    </>
  )
}

export default Canvas;