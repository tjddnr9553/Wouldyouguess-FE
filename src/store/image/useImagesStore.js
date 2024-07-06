import { create } from "zustand";

const useImagesStore = create((set) => ({
  images: [],
  addImages: (image) => set((state) => ({ images: [...state.images, image] })),
}));
export default useImagesStore;
