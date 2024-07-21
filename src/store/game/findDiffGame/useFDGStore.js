import { create } from "zustand";

const useFDGStore = create((set) => ({
    findDiffGameId: 0,
    setFindDiffGameId: (findDiffGameId) => set({ findDiffGameId }),
}));

export default useFDGStore;