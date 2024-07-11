import { create } from 'zustand'

export const useCanvasStore = create((set) => ({
    tool: 'pencil',
    setTool: (tool) => set({ tool }),
    color: '#000',
    setColor: (color) => set({ color }),
    size: 8,
    setSize: (size) => set({ size }),
    fillColor: '',
    setFillColor: (fillColor) => set({ fillColor }),
  }));