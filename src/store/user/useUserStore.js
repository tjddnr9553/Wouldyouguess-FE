import { create } from "zustand";

const useUserStore = create((set) => ({
    uesrId: 1,
    nickname: "김광윤",
    rank: null,
    score: 0,
    gameRole: "drawer",   // drawer, watcher
    isInvited: false
}));
export default useUserStore;
