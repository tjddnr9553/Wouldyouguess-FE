import { useEffect, useRef } from 'react';
import './Canvas.css'

const Canvas = ({width, height, inpaintForm, setInpaintForm}) => {
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
    contextRef.current.clearRect(0, 0, width, height);
    const { x, y } = getCursorPosition(e);
 
    const length = 100;
    contextRef.current.strokeRect(x - length / 2, y - length / 2, length, length);

       // 마스킹 영역 업데이트
    const updatedInpaintForm = new FormData();

    // 기존 inpaintForm의 모든 데이터를 새 FormData 객체에 복사
    for (let [key, value] of inpaintForm.entries()) {
      updatedInpaintForm.append(key, value);
    }

    // 새로운 마스킹 좌표 설정
    updatedInpaintForm.set("maskX1", (x - length / 2)> 0 ? Math.round(x - length / 2) : 0);
    updatedInpaintForm.set("maskY1", (y - length / 2) > 0 ? Math.round(y - length / 2) : 0);
    updatedInpaintForm.set("maskX2", Math.round(x + length / 2));
    updatedInpaintForm.set("maskY2", Math.round(y + length / 2));

    console.log("Updated mask coordinates:", {
      maskX1: (x - length / 2) > 0 ? Math.round(x - length / 2) : 0,
      maskY1: (y - length / 2) > 0 ? Math.round(y - length / 2) : 0,
      maskX2: Math.round(x + length / 2),
      maskY2: Math.round(y + length / 2),
    });

    setInpaintForm(updatedInpaintForm);
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