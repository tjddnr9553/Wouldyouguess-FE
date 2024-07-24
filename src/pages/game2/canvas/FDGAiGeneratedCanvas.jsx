import { useEffect, useRef } from "react";
import useFDGCanvasStore from "../../../store/game/findDiffGame/useFDGCanvasStore.js";

const FDGAiGeneratedCanvas = ({
  image,
  setNewMasking,
  mode,
  endSearch,
  maskX1,
  maskY1,
  maskX2,
  maskY2,
  checkAnswerAndCondition,
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const { setAnswerX, setAnswerY } = useFDGCanvasStore();

  const lengthX = Math.abs(maskX1 - maskX2);
  const lengthY = Math.abs(maskY1 - maskY2);

  // 캔버스 셋팅
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (!image) return;

    drawImg(image);

    if (setNewMasking) {
      setNewMasking(false); // 마스킹 이미지 캔버스에 그리기 완료
    }
  }, [image, maskX1, maskX2, maskY1, maskY2]);

  // 한 라운드가 끝나면
  useEffect(() => {
    if (endSearch) {
      contextRef.current.lineWidth = 20;
      contextRef.current.strokeStyle = "#fff";

      contextRef.current.strokeRect(maskX1, maskY1, lengthX, lengthY);

      contextRef.current.lineWidth = 8;
      contextRef.current.strokeStyle = "#ff0000";

      contextRef.current.strokeRect(maskX1, maskY1, lengthX, lengthY);
    }
  }, [endSearch]);

  const getCursorPosition = (e) => {
    const { top, left } = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    };
  };

  const onMouseDown = async (e) => {
    if (endSearch) return;

    const { x, y } = getCursorPosition(e);

    const isSuccess = await checkAnswerAndCondition(x, y);

    const image = new Image();
    const successSound = new Audio("/sound_effects/success_sound.mp3");
    const failSound = new Audio("/sound_effects/fail_sound.mp3");
    if (isSuccess) {
      image.src = "/images/game/game2/success.png";
      successSound.play();
    } else {
      image.src = "/images/game/game2/fail.png";
      failSound.play();
    }

    image.onload = () => {
      contextRef.current.drawImage(image, x - 25, y - 30, 50, 50);
    };
  };

  const drawImg = (image) => {
    return new Promise((resolve) => {
      if (image) {
        const imageURL =
          typeof image === "string" ? image : URL.createObjectURL(image);
        const img = new Image();
        img.src = imageURL;

        img.onload = () => {
          if (mode === "aiImgUpload") {
            let startTime;
            const duration = 1000; // 애니메이션 진행 시간 조절 여기서

            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;

              const progress = Math.min(elapsed / duration, 1);

              const currentWidth = lengthX * progress;
              const currentHeight = lengthY * progress;

              contextRef.current.drawImage(
                img,
                maskX1,
                maskY1,
                currentWidth,
                currentHeight,
                maskX1,
                maskY1,
                currentWidth,
                currentHeight
              );

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          } else {
            contextRef.current.drawImage(img, 0, 0);
          }

          if (mode === "upload") {
            contextRef.current.fillStyle = "#ffffff";
            contextRef.current.fillRect(maskX1, maskY1, lengthX, lengthY);
          }

          // URL 해제
          URL.revokeObjectURL(imageURL, 0, 0);

          resolve();
        };
      }
    });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        onMouseDown={onMouseDown}
      />
    </>
  );
};

export default FDGAiGeneratedCanvas;
