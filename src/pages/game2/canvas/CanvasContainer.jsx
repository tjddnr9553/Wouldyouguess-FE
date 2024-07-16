import { useRef, useState } from "react";
import { useEffect } from "react";
import { useCanvasStore, useFileStore} from "../../../store/game/useGameStore";
import Canvas from "./Canvas";

const CanvasContainer = () => {
  const {setIsImgUploaded} = useCanvasStore();
  const {file} = useFileStore();

  const containerWrapper = useRef(null);
  const canvasContainerRef = useRef(null);
  const uploadImgRef = useRef(null);

  useEffect(() => {
    if(file) {
      createImgEl();
    }
  }, [file])

  const createImgEl = () => {
    setIsImgUploaded(true);

    const imageUrl = URL.createObjectURL(file);
    
    uploadImgRef.current.src = imageUrl;

    uploadImgRef.current.onload = () => {
      canvasContainerRef.current.style.border = '5px solid red';
    }

    return () => {
      URL.revokeObjectURL(imageUrl);
      console.log("이미지 URL 삭제");
    };
  }

  return(
    <>
      <div className="containerWrapper" ref={containerWrapper}>
        <div 
          className="game2-canvas-container"
          ref={canvasContainerRef}
        >
          <img ref={uploadImgRef} src="" id="upload-img" />
          <Canvas/>
        </div>
      </div>
    </>
  )
}

export default CanvasContainer;