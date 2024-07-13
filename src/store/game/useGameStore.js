import { create } from "zustand";

const useGameStore = create((set) => ({
  findDiffGameId: 0,
  setFindDiffGameId: (findDiffGameId) => set({ findDiffGameId }),
}));
export default useGameStore;