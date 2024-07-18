import {useEffect, useRef} from 'react';
import CanvasTool from './FDGCanvasTool.js'
import useFDGCanvasStore from "../../../store/game/findDiffGame/useFDGCanvasStore.js";
import useFDGFileStore from "../../../store/game/findDiffGame/useFDGFileStore.js";

const FDGCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const toolRef = useRef(null);

  const { uploadFile, setOriginalFile } = useFDGFileStore();
  const { setX, setY, setIsImgUploaded, setFDGCanvasRef, setCanvasClick } = useFDGCanvasStore();

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;
    setFDGCanvasRef(canvas);

    const context = canvas.getContext("2d");
    contextRef.current = context;
    toolRef.current = CanvasTool(context);
  }, []);

  useEffect(() => {
    if(!uploadFile) return;

    drawImg().then(async () => {
      await canvasRef.current.toBlob( async (blob) => {
        setOriginalFile(blob);
      }, 'image/png');

      setIsImgUploaded(true);
    })
  }, [uploadFile]);

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const mouseDownCanvas = (e) => {
    const { x, y } = getCursorPosition(e);

    drawImg(() => {
      toolRef.current.StrokeRect(100, x, y);
    });

    setX(x);
    setY(y);
    setCanvasClick(true);
  }

  const mouseUpCanvas = (e) => {
    setCanvasClick(false);
  }

  const drawImg = (callback) => {
    return new Promise((resolve) => {
      if(uploadFile){
        const imageURL = typeof uploadFile === 'string' ? uploadFile : URL.createObjectURL(uploadFile);
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
    
          if (callback) callback();
    
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
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // backgroundColor: "transparent",
        }}
        width={512}
        height={512}
        onMouseDown={mouseDownCanvas}
        onMouseUp={mouseUpCanvas}
      />
    </>
  )
}

export default FDGCanvas;