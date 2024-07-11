import { create } from "zustand";

const useUserStore = create((set) => ({
    uesrId: null,
    nickname: null,
    rank: null,
    score: 0,
    gameRole: "drawer",   // drawer, watcher

}));
export default useUserStore;
