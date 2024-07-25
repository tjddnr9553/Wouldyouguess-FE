export const TOOL_RECTANGLE = 'rectangle';

export default (context) => {
  let rectangleItem = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    rectangleItem = {
      tool: TOOL_RECTANGLE,
      color,
      size,
      fill,
      start: { x, y },
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    return [rectangleItem];
  }

  const drawRectangle = (rectangleItem, mouseX, mouseY) => {
    const startX = mouseX < rectangleItem.start.x ? mouseX : rectangleItem.start.x;
    const startY = mouseY < rectangleItem.start.y ? mouseY : rectangleItem.start.y;
    const widthX = Math.abs(rectangleItem.start.x - mouseX);
    const widthY = Math.abs(rectangleItem.start.y - mouseY);

    context.beginPath();
    var gradient3 = context.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 30);      
    gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
    gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
    context.fillStyle = gradient3;
    context.lineWidth = rectangleItem.size;
    context.strokeStyle = rectangleItem.color;
    context.fillStyle = rectangleItem.fill;
    context.rect(startX, startY, widthX, widthY);
    context.stroke();
    if (rectangleItem.fill) context.fill();
  }

  const onMouseMove = (x, y) => {
    if (!rectangleItem) return;
    context.putImageData(imageData, 0, 0);

    context.save();
    drawRectangle(rectangleItem, x, y);
    context.restore();
  };

  const onMouseUp = (x, y) => {
    if (!rectangleItem) return;
    onMouseMove(x, y);
    // const item = rectangleItem;
    rectangleItem = null;
    // item.end = { x, y };
    // return [item];
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}