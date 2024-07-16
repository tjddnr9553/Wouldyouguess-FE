export default (context) => {
  const FullRect = (length, x, y) => {
        context.fillStyle = 'black';
        context.fillRect(x - length / 2, y - length / 2, length, length);
  }

  const FillText = (fontsize, x, y) => {
    context.lineWidth = 2;
    context.fillStyle = 'white';
    context.font = `${fontsize}px Arial`; 
    context.textAlign = 'center'; // 텍스트 가로 정렬
    context.textBaseline = 'middle'; // 텍스트 세로 정렬
    context.fillText('Mask', x, y); 
  }

  const Masking = (width, height, x, y, length) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        context.fillStyle = 'white';
        context.fillRect(x - length / 2, y - length / 2, length, length);
  }

  return {
    FullRect,
    FillText,
    Masking
  }
} 
