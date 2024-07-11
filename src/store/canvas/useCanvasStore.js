import { create } from 'zustand'

export const useCanvasStore = create((set, get) => ({
    tool: 'pencil',
    setTool: (tool) => set({ tool }),
    color: '#000',
    setColor: (color) => set({ color }),
    size: 8,
    setSize: (size) => set({ size }),
    fillColor: '',
    setFillColor: (fillColor) => set({ fillColor }),
    clearBtnClick: false,
    setClearBtnClick: (clearBtnClick) => set({ clearBtnClick }),
    canvas: '',
    setCanvas: (canvas) => set({canvas}),
    getSaveImg: () => {
      const canvas = get().canvas;
      const imgUrl = canvas.toDataURL("image/png");
      return imgUrl;
    },
  }));