import { create } from "zustand";

const useUserStore = create((set) => ({
    user_id: null,
    nickname: null,
    rank: null,
    score: 0,
    game1_role: null,   // drawer, watcher

}));
export default useUserStore;
