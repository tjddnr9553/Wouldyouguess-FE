import { create } from "zustand";

const useImagesStore = create((set) => ({
  generatedImages: [],
  setGeneratedImages: (images) => set({ generatedImages: images }),

  clearAllImages: () => set({ generatedImages: [] }),
}));

export default useImagesStore;
