import {create} from "zustand";

const useCatchLiarStore = create((set) => ({
    gameId: 0,
    isDrawing: false,
    isLiar: false,
    keyword: "",
    totalRound: 0,
    imageKey: '',
    imagePath: '',

    setGameId: (gameId) => set({ gameId }),
    setIsDrawing: (isDrawing) => set({ isDrawing }),
    setIsLiar: (isLiar) => set({ isLiar }),
    setKeyword: (keyword) => set({ keyword }),
    setTotalRound: (totalRound) => set({ totalRound }),
    setImageKey: (imageKey) => set({ imageKey }),
    setImagePath: (imagePath) => set({ imagePath }),
}));

export default useCatchLiarStore;
