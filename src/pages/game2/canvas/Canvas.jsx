import { useEffect, useRef, useState } from 'react';
import './Canvas.css'
import useGameStore, { useCanvasStore, useFileStore } from '../../../store/game/useGameStore';
import CanvasTool from './CanvasTool.js'

const Canvas = () => {
  const {x, y, setX, setY, isImgUploaded, setIsImgUploaded, setIsMaskingComplete} = useCanvasStore();
  const {mode, clickSendBtn} = useGameStore();
  const {file, updateUploadForm, updateInpaintForm, } = useFileStore();

  const canvasRef = useRef(null);
  const contextRef = useRef();
  const toolRef = useRef(null);

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    toolRef.current = CanvasTool(context);
  }, [])

  useEffect(() => {
    if(file) {
      drawImg().then(() => {
        console.log("이미지 그리기 성공");
        setIsImgUploaded(true);
      })
    }
  }, [file])

  // 캔버스 원본 이미지를 uploadForm에 저장
  useEffect(() => {
    if (isImgUploaded) {
      const canvas = canvasRef.current;
      const imgUrl = canvas.toDataURL("image/png");

      updateUploadForm('image', imgUrl);
      updateInpaintForm('image', imgUrl);
    }
  }, [isImgUploaded])

  // 최종적으로 서버에 캔버스 이미지 전송
  useEffect(() => {
    if (clickSendBtn) {
      toolRef.current.Masking(canvasRef.current.width, canvasRef.current.height, x, y, 100);

      const canvas = canvasRef.current;
      const imgURL = canvas.toDataURL("image/png");
      updateInpaintForm("mask", imgURL);

      setIsMaskingComplete(true);
    }
  }, [clickSendBtn])

  const drawImg = (callback) => {
    return new Promise((resolve) => {
      const imageURL = URL.createObjectURL(file);
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
    })
  }

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const clickCanvas = (e) => {
    const { x, y } = getCursorPosition(e);
    
    if (mode === 'upload') {
      drawImg(() => {
        toolRef.current.FullRect(100, x, y);
        toolRef.current.FillText(30, x, y);
      });
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
          // backgroundColor: "transparent",
        }}
        width={512}
        height={512}
        onMouseDown={clickCanvas}
      />
    </>
  )
}

export default Canvas;