export const TOOL_CLEAR = 'clear';

export default (context) => {
  const clearCanvas = (width, height) => {
    context.clearRect(0, 0, width, height);
  }

  return {clearCanvas}
}