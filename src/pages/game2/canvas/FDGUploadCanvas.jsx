import {useEffect, useRef} from 'react';

import useFDGCanvasStore from "../../../store/game/findDiffGame/useFDGCanvasStore.js";
import useFDGFileStore from "../../../store/game/findDiffGame/useFDGFileStore.js";

import Rectangle from "../../game1/canvas/tools/Rectangle.js";

const FDGUploadCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const toolRef = useRef(null);

  const { resizingImage, setOriginalImage  } = useFDGFileStore();
  const { setFDGCanvasRef, setStartX, setEndX, setStartY, setEndY } = useFDGCanvasStore();

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;
    setFDGCanvasRef(canvas);

    contextRef.current = canvas.getContext("2d");
    toolRef.current = Rectangle(contextRef.current);
  }, []);

  useEffect(() => {
    if (!resizingImage) return;

    drawImg(resizingImage).then(async () => {
      await canvasRef.current.toBlob(async (blob) => {
        setOriginalImage(blob);
      }, 'image/png');
    })
  },  [resizingImage]);

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const onMouseDown = (e) => {
    const { x, y } = getCursorPosition(e);
    setStartX(x);
    setStartY(y);

    toolRef.current.onMouseDown(x, y, '#ff0000', 8, false);
  };

  const onMouseUp = (e) => {
    const { x, y } = getCursorPosition(e);
    setEndX(x);
    setEndY(y);
    toolRef.current.onMouseUp(x, y);
  };

  const onMouseMove = (e) => {
    const { x, y } = getCursorPosition(e);
    toolRef.current.onMouseMove(x, y);
  };

  const drawImg = (image, callback) => {
    return new Promise((resolve) => {
      if (image) {
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

          const sx = imgWidth / 2 - sLength / 2;
          const sy = imgHeight / 2 - sLength / 2;

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
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
          />
        </>
    );
  }

export default FDGUploadCanvas;