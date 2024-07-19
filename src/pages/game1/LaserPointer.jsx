import { useRef, useEffect, useState, useId } from "react";
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
import useRoomStore from "../../store/room/useRoomStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useUserStore from "../../store/user/useUserStore.js";

const LaserPointer = ({ width, height, zIndex, position }) => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [clientLines, setClientLines] = useState({});
  const [laserIsDrawing, setLaserIsDrawing] = useState(false);
  const [lastLineCompleteTime, setLastLineCompleteTime] = useState(null);

  const { socket } = useSocketStore();
  const { roomId } = useRoomStore();
  const { isDrawing } = useCatchLiarStore();
  const { userId } = useUserStore();

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
      for (const userId in clientLines) {
        const lines = clientLines[userId];
        lines.forEach((line) => {
          const drainedPoints = drainPoints(line);
          if (drainedPoints.length > 5) {
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

            // 선에 그림자 블러 효과를 줘서 형광펜 느낌나도록
            ctx.shadowColor = "rgba(255, 0, 0, 1)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;

            setColor(255, 255, 255);
            setOpacity(1);
            setMaxWidth(5);
            setMinWidth(5);
            drawDrawingBezierData(ctx, drawingData);

            ctx.shadowColor = "transparent";
          }
        });

        if (lastLineCompleteTime && Date.now() - lastLineCompleteTime > 3000) {
          setClientLines((prevLines) => {
            const newLines = { ...prevLines };
            delete newLines[userId]; // 해당 socketId의 선만 삭제
            return newLines;
          });
        }
      }
    };

    const intervalId = setInterval(draw, 8);
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
  }, [socket, isDrawing, laserIsDrawing]);

  const handleMouseDown = (e) => {
    setLaserIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect(); // 캔버스의 위치 계산
    const newPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
    };
    setLines([...lines, [newPoint]]); // 새로운 선 시작

    setClientLines((prevLines) => ({
      ...prevLines,
      [userId]: prevLines[userId]
        ? [...prevLines[userId], [newPoint]]
        : [[newPoint]],
    }));

    socket?.emit("watcher_draw_start", {
      xAxis: newPoint.x,
      yAxis: newPoint.y,
      time: newPoint.time,
      roomId,
    });
  };

  const handleMouseMove = (e) => {
    if (laserIsDrawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newPoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: Date.now(),
      };

      socket?.emit("watcher_draw_move", {
        xAxis: newPoint.x,
        yAxis: newPoint.y,
        time: newPoint.time,
        roomId,
      });

      setClientLines((prevLines) => {
        const lines = prevLines[userId] || [];
        const lastLine = lines[lines.length - 1] || [];
        return {
          ...prevLines,
          [userId]: [...lines.slice(0, -1), [...lastLine, newPoint]],
        };
      });
      setLastLineCompleteTime(Date.now());
    }
  };

  const handleMouseUp = () => {
    setLaserIsDrawing(false);
    if (lines.length > 0) {
      setLastLineCompleteTime(Date.now()); // 마지막 선 완료 시간 기록
    }
  };

  const handleWatcherDrawStart = (data) => {
    if (isDrawing) return;
    const { xAxis, yAxis, time } = data;

    const newPoint = {
      x: xAxis,
      y: yAxis,
      time,
    };

    setClientLines((prevLines) => ({
      ...prevLines,
      [userId]: prevLines[userId]
        ? [...prevLines[userId], [newPoint]]
        : [[newPoint]],
    }));
  };

  const handleWatcherDrawMove = (data) => {
    if (isDrawing) return;
    const { xAxis, yAxis, time } = data;

    const newPoint = {
      x: xAxis,
      y: yAxis,
      time,
    };

    setClientLines((prevLines) => {
      const lines = prevLines[userId] || [];
      const lastLine = lines[lines.length - 1] || [];
      return {
        ...prevLines,
        [userId]: [
          ...lines.slice(0, -1),
          [...lastLine, { x: xAxis, y: yAxis, time }],
        ],
      };
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
