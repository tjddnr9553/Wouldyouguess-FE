import { create } from "zustand";

const initialState = {
    FDGCanvasRef: null,
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
    isImgUploaded: false,
    canvasClick: false,
    // answerClick: false,
    // answerX: 0,
    // answerY: 0,
};


const useFDGCanvasStore = create((set)=>({
    ...initialState,
    setFDGCanvasRef: (FDGCanvasRef) => set({FDGCanvasRef}),

    setStartX: (startX) => set({ startX }),
    setEndX: (endX) => set({ endX }),
    setStartY: (startY) => set({ startY }),
    setEndY: (endY) => set({ endY }),

    setIsImgUploaded: (isImgUploaded) => set({isImgUploaded}),
    setCanvasClick: (canvasClick) => set({canvasClick}),

    // setAnswerClick: (answerClick) => set({ answerClick }),
    // setAnswerX: (answerX) => set({ answerX }),
    // setAnswerY: (answerY) => set({ answerY }),

    resetFDGCanvasStore: () => set(initialState)
}));

export default useFDGCanvasStore;