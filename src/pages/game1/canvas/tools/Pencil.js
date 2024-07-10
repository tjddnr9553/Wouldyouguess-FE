export const TOOL_PENCIL = 'pencil';

export default (context) => {
  let drawItem = null;
  let points = []; // 시작점

  const onMouseDown = (x, y, color, size) => {
    drawItem = {
      tool: TOOL_PENCIL,
      color,
      size,
      points: [{ x, y }]
    };
    return [drawItem];
  }

  const drawLine = (drawItem, start, {x, y}) => {
    context.save(); // 기존 스타일 저장
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath(); // 새로운 path 시작
    context.lineWidth = drawItem.size;
    context.strokeStyle = drawItem.color;
    context.globalCompositeOperation = 'source-over'; // 처음 그려진 도형 위에 나중에 그려진 도형 표시
    context.moveTo(start.x, start.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore(); // 위에서 설정한 속성들을 원래대로 복구
  }

  const onMouseMove = (x, y) => {
    if (!drawItem) return [];

    const newPoint = {x, y};
    const start = drawItem.points.slice(-1)[0]; // 마지막 요소 추출
    drawLine(drawItem, start, newPoint);
    drawItem.points.push(newPoint);
    points.push(newPoint);

    return [drawItem];
  }

  const onMouseUp = (x, y) => {
    if (!drawItem) return [];

    onMouseMove(x,y) // 최종적으로 그리기
    // const item  = { ...drawItem, end: {x,y} };
    drawItem = null;
    points = [];
    // return [ item ];
  }

  const draw = () => {}

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw,
  };
}
