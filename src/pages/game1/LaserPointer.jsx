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
import useSocketStore from "../../store/socket/useSocketStore.js";
import {TOOL_PENCIL} from "./canvas/tools/index.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";

const LaserPointer = ({ width, height, zIndex, position }) => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [laserIsDrawing, setLaserIsDrawing] = useState(false);
  const [lastLineCompleteTime, setLastLineCompleteTime] = useState(null);

  const { socket } = useSocketStore();
  const { roomId } = useRoomStore();
  const { isDrawing } = useCatchLiarStore();

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
          // setColor(255, 255, 255);
          // setOpacity(1);
          // setMaxWidth(5);
          // setMinWidth(5);
          // drawDrawingBezierData(ctx, drawingData);
        }
      });

      if (lastLineCompleteTime && Date.now() - lastLineCompleteTime > 3000) {
        setLines([]); // 3초 후 모든 선 지우기
      }
    };


    const intervalId = setInterval(draw);

    return () => {
      clearInterval(intervalId);
    };
  }, [lines, laserIsDrawing, lastLineCompleteTime]);

  useEffect(() => {
    socket?.on("watcher_draw_start", handleWatcherDrawStart);
    socket?.on("watcher_draw_move", handleWatcherDrawMove);

    return () => {
      socket?.off("watcher_draw_start", handleWatcherDrawStart);
      socket?.off("watcher_draw_move", handleWatcherDrawMove);
    };
  }, [socket, isDrawing]);

  const handleMouseDown = (e) => {
    setLaserIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect(); // 캔버스의 위치 계산
    const newPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
    };
    setLines([...lines, [newPoint]]); // 새로운 선 시작

    socket?.emit("watcher_draw_start", { xAxis: newPoint.x, yAxis: newPoint.y, time: newPoint.time, roomId });
  };

  const handleMouseMove = (e) => {
    if (laserIsDrawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: Date.now(),
      };

      socket?.emit("watcher_draw_move", { xAxis: newPoint.x, yAxis: newPoint.y, time: newPoint.time, roomId });

      setLines((prevLines) => {
        if (prevLines.length === 0) {
          return [[newPoint]];
        } else {
          const lastLine = prevLines[prevLines.length - 1];
          return [...prevLines.slice(0, -1), [...lastLine, newPoint]];
        }
      });
      setLastLineCompleteTime(Date.now());
    }
  };

  const handleMouseUp = () => {
    setLaserIsDrawing(false);
    if (lines.length > 0) {
      // lines 배열이 비어있지 않은 경우에만
      setLastLineCompleteTime(Date.now()); // 마지막 선 완료 시간 기록
    }
  };

  const handleWatcherDrawStart = (data) => {
    console.log(isDrawing)
    if(isDrawing) return;
    const { xAxis, yAxis, time } = data;

    const newPoint = {
      x: xAxis,
      y: yAxis,
      time
    };
    setLines([...lines, [newPoint]]); // 새로운 선 시작
  };

  const handleWatcherDrawMove = (data) => {
    console.log(isDrawing)
    if(isDrawing) return;
    const { xAxis, yAxis, time } = data;

    const newPoint = {
      x: xAxis,
      y: yAxis,
      time
    };

    setLines((prevLine) => {
      if (prevLine.length === 0) {
        return [[newPoint]];
      } else {
        const lastLine = prevLine[prevLine.length - 1];
        return [...prevLine.slice(0, -1), [...lastLine, newPoint]];
      }
    });
    setLastLineCompleteTime(Date.now());
  };


  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        backgroundColor: "transparent",
        position: position,
        zIndex: zIndex,
      }}
    />
  );
};

export default LaserPointer;
