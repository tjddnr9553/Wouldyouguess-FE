import {create} from "zustand";

const useCatchLiarStore = create((set) => ({
    gameId: 0,
    isDrawing: false,
    isLiar: false,
    keyword: "",

    setGameId: (gameId) => set({ gameId }),
    setIsDrawing: (isDrawing) => set({ isDrawing }),
    setIsLiar: (isLiar) => set({ isLiar }),
    setKeyword: (keyword) => set({ keyword }),
}));
export default useCatchLiarStore;
