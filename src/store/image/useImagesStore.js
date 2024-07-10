import { create } from "zustand";

const useImagesStore = create((set) => ({
  images: ["images/gen1.png", "images/gen2.png", "images/gen3.png"],
  addImages: (image) => set((state) => ({ images: [...state.images, image] })),
}));
export default useImagesStore;
