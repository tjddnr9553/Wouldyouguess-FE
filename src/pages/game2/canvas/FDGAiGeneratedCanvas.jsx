import {useEffect, useRef} from 'react';
import useFDGCanvasStore from "../../../store/game/findDiffGame/useFDGCanvasStore.js";

const FDGAiGeneratedCanvas = ({ image }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const { setAnswerX, setAnswerY } = useFDGCanvasStore();

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
          const canvasWidth = canvasRef.current.width;
          const canvasHeight = canvasRef.current.height;
    
          const imgWidth = img.width;
          const imgHeight = img.height;
          
          let sLength = 0;
    
          if (imgWidth < imgHeight) {
            sLength = imgWidth;
          } else {
            sLength = imgHeight;
          }
    
          const sx = imgWidth/2 - sLength/2;
          const sy = imgHeight/2 - sLength/2;
    
          contextRef.current.drawImage(
            img,
            sx, sy, sLength, sLength, 
            0, 0, canvasWidth, canvasHeight 
          );
    
          // URL 해제
          URL.revokeObjectURL(imageURL);
  
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