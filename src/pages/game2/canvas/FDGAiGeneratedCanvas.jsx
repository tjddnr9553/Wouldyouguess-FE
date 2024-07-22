import {useEffect, useRef} from 'react';
import useFDGCanvasStore from "../../../store/game/findDiffGame/useFDGCanvasStore.js";

const FDGAiGeneratedCanvas = ({ image, mode, endSearch, maskX1, maskY1, maskX2, maskY2 }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const { setAnswerX, setAnswerY } = useFDGCanvasStore();

  const lengthX = Math.abs(maskX1- maskX2);
  const lengthY = Math.abs(maskY1 - maskY2);

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if(!image) return;

    drawImg(image);
  }, [image]);

  useEffect(() => {
    if (endSearch) {
      contextRef.current.lineWidth = 4;
      contextRef.current.strokeStyle = '#ff0000'

      contextRef.current.strokeRect(maskX1, maskY1, lengthX, lengthY);
    }
  }, [endSearch])

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const onMouseDown = (e) => {
    const { x, y } = getCursorPosition(e);
    setAnswerX(x);
    setAnswerY(y);
  };


  const drawImg = (image) => {
    return new Promise((resolve) => {
      if(image){
        const imageURL = typeof image === 'string' ? image : URL.createObjectURL(image);
        const img = new Image();
        img.src = imageURL;
    
        img.onload = () => {
          if (mode === 'aiImgUpload') {
            contextRef.current.drawImage(img, maskX1, maskY1, lengthX, lengthY, maskX1, maskY1, lengthX, lengthY);
          } else {
            contextRef.current.drawImage(img, 0, 0);
          }
    
          if (mode === 'upload') {
            contextRef.current.fillStyle = "#ffffff";
            contextRef.current.fillRect(maskX1, maskY1, lengthX, lengthY);
          }

          // URL 해제
          URL.revokeObjectURL(imageURL, 0, 0);
  
          resolve();
        }
      }
    })
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onMouseDown={onMouseDown}
      />
    </>
  )
}

export default FDGAiGeneratedCanvas;