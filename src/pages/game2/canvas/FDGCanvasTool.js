export default (context) => {
  const StrokeRect = (length, x, y) => {
        context.strokeStyle = 'red';
        context.lineWidth = 5;
        context.strokeRect(x - length / 2, y - length / 2, length, length);
  }

  return {
    StrokeRect
  }
} 
