import { create } from "zustand";

const useFDGCanvasStore = create((set)=>({
    FDGCanvasRef: null,
    setFDGCanvasRef: (FDGCanvasRef) => set({FDGCanvasRef}),

    startX: 0,
    setStartX: (startX) => set({ startX }),
    endX: 0,
    setEndX: (endX) => set({ endX }),
    startY: 0,
    setStartY: (startY) => set({ startY }),
    endY: 0,
    setEndY: (endY) => set({ endY }),

    isImgUploaded: false,
    setIsImgUploaded: (isImgUploaded) => set({isImgUploaded}),
    canvasClick: false,
    setCanvasClick: (canvasClick) => set({canvasClick}),

    // answerClick: false,
    // setAnswerClick: (answerClick) => set({ answerClick }),
    // answerX: 0,
    // setAnswerX: (answerX) => set({ answerX }),
    // answerY: 0,
    // setAnswerY: (answerY) => set({ answerY }),
}));

export default useFDGCanvasStore;