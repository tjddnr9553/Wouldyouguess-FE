import { create } from "zustand";

const useImagesStore = create((set) => ({
  originalImages: [],
  generatedImages: [],

  setOriginalImages: (images) => set({ originalImages: images }),

  setGeneratedImages: (images) => set({ generatedImages: images }),

  clearAllImages: () => set({ originalImages: [], generatedImages: [] }),
}));

export default useImagesStore;
