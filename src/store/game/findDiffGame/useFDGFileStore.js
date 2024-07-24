import { create } from "zustand";

const initialState = {
    resizingImage: null,
    originalImage: null,
    maskingImage: null,
    aiGeneratedImage: null,
};

const useFDGFileStore = create((set)=>({
    ...initialState,
    setResizingImage: (resizingImage) => set({resizingImage}),
    setOriginalImage: (originalImage) => set({originalImage}),
    setMaskingImage: (maskingImage) => set({maskingImage}),
    setAiGeneratedImage: (aiGeneratedImage) => set({aiGeneratedImage}),

    resetFDGFileStore: () => set(initialState)
}))

export default useFDGFileStore;
