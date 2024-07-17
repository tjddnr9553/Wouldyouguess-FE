import { useRef, useEffect, useState } from "react";
import {
  drainPoints,
  setDelay,
  setMaxWidth,
  setMinWidth,
  setOpacity,
  setColor,
  setRoundCap,
  calControlPoints,
  transformPointToBezier,
  calDrawingData,
  drawDrawingBezierData,
} from "laser-pen";

function LaserPointer() {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastLineCompleteTime, setLastLineCompleteTime] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 레이저 펜 초기 설정
    setDelay(3000);
    setRoundCap(true);

    if (ctx) {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
    }

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const newPoint = {
        x: e.clientX - (canvas.offsetLeft || 0),
        y: e.clientY - (canvas.offsetTop || 0),
        time: Date.now(),
      };
      setLines([...lines, [newPoint]]); // 새로운 선 시작
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        const newPoint = {
          x: e.clientX - (canvas.offsetLeft || 0),
          y: e.clientY - (canvas.offsetTop || 0),
          time: Date.now(),
        };

        setLines((prevLines) => {
          if (prevLines.length === 0) {
            // lines 배열이 비어 있는 경우
            return [[newPoint]]; // 새로운 선 시작
          } else {
            const lastLine = prevLines[prevLines.length - 1];
            return [...prevLines.slice(0, -1), [...lastLine, newPoint]]; // 마지막 선에 포인트 추가
          }
        });
        setLastLineCompleteTime(Date.now()); // 마지막 선 완료 시간 기록
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      if (lines.length > 0) {
        // lines 배열이 비어있지 않은 경우에만
        setLastLineCompleteTime(Date.now()); // 마지막 선 완료 시간 기록
      }
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();

      lines.forEach((line) => {
        const drainedPoints = drainPoints(line);
        if (drainedPoints.length > 2) {
          const elapsedTime = currentTime - line[0].time;
          const opacity = Math.max(0, 1 - elapsedTime / 5000);
          setOpacity(opacity);

          const controlPoints = calControlPoints(drainedPoints);
          const bezierCurves = transformPointToBezier(
            drainedPoints,
            controlPoints
          );
          const totalLength = bezierCurves.reduce(
            (sum, bz) => sum + bz.length(),
            0
          );
          const drawingData = calDrawingData(bezierCurves, totalLength);

          // 겉 색상 (빨간색)
          setColor(255, 0, 0);
          setOpacity(1);
          setMaxWidth(5);
          setMinWidth(5);
          drawDrawingBezierData(ctx, drawingData);

          // 안쪽 색상 (흰색)
          setColor(255, 255, 255);
          setOpacity(1);
          setMaxWidth(5);
          setMinWidth(5);
          drawDrawingBezierData(ctx, drawingData);
        }
      });

      if (lastLineCompleteTime && Date.now() - lastLineCompleteTime > 3000) {
        setLines([]); // 3초 후 모든 선 지우기
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    const intervalId = setInterval(draw);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
    };
  }, [lines, isDrawing, lastLineCompleteTime]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:"800px",
        height:"600px"
      }}
    >
      <canvas
        ref={canvasRef}
        width="800px"
        height="600px"
        style={{ border: "1px solid black", backgroundColor: "white" }}
      />
    </div>
  );
}

export default LaserPointer;
