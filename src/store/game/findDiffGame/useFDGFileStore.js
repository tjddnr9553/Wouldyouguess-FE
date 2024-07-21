import { create } from "zustand";

const useFDGFileStore = create((set)=>({
    resizingImage: null,
    setResizingImage: (resizingImage) => set({resizingImage}),

    originalImage: null,
    setOriginalImage: (originalImage) => set({originalImage}),

    maskingImage: null,
    setMaskingImage: (maskingImage) => set({maskingImage}),

    aiGeneratedImage: null,
    setAiGeneratedImage: (aiGeneratedImage) => set({aiGeneratedImage}),
}))

export default useFDGFileStore;
