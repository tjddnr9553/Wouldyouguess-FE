import { create } from "zustand";

const useImagesStore = create((set) => ({
  originalImages: [], // URL 문자열의 배열
  generatedImages: [], // 객체의 배열 (URL과 마스크 좌표 포함)

  setOriginalImages: (images) => set({ originalImages: images }),
  setGeneratedImages: (images) => set({ generatedImages: images }),

  clearAllImages: () => set({ originalImages: [], generatedImages: [] }),
}));

export default useImagesStore;
