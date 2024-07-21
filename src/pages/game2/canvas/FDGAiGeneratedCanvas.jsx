import {useEffect, useRef} from 'react';
import useFDGFileStore from "../../../store/game/findDiffGame/useFDGFileStore.js";

const FDGAiGeneratedCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const toolRef = useRef(null);

  const { aiGeneratedImage, setAiGeneratedImage } = useFDGFileStore();

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if(!aiGeneratedImage) return;

    drawImg();
  }, [aiGeneratedImage]);


  const drawImg = (callback) => {
    return new Promise((resolve) => {
      if(aiGeneratedImage){
        const imageURL = typeof aiGeneratedImage === 'string' ? aiGeneratedImage : URL.createObjectURL(aiGeneratedImage);
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
        width={512}
        height={512}
      />
    </>
  )
}

export default FDGAiGeneratedCanvas;