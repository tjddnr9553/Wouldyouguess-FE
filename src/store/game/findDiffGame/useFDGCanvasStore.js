import { create } from "zustand";

const useFDGCanvasStore = create((set)=>({
    FDGCanvasRef: null,
    setFDGCanvasRef: (FDGCanvasRef) => set({FDGCanvasRef}),

    x: 0,
    setX: (x) => set({x}),
    y: 0,
    setY: (y) => set({y}),

    isImgUploaded: false,
    setIsImgUploaded: (isImgUploaded) => set({isImgUploaded}),
    canvasClick: false,
    setCanvasClick: (canvasClick) => set({canvasClick}),
}));

export default useFDGCanvasStore;