import { useRef } from 'react';
import './Canvas.css'

const Canvas = ({selectedImage, clickUploadBtn, width, height }) => {
  const canvasRef = useRef(null);

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const clickCanvas = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    const { x, y } = getCursorPosition(e);
 
    const length = 100;
    context.strokeRect(x - length / 2, y - length / 2, length, length);
  }

  return (
  <div className="canvas-container" style={{ width, height }}>
    {selectedImage && (
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
    )}
  </div>
  )
}

export default Canvas;