import { create } from "zustand";

const useUserStore = create((set) => ({
  userId: 0,
  nickname: "",
  username: "",
  accessToken: "",
  rank: 0,
  score: 0,
  gameRole: "drawer", // drawer, watcher

  setUserId: (userId) => set({ userId }),
  setNickname: (nickname) => set({ nickname }),
  setUsername: (username) => set({ username }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRank: (rank) => set({ rank }),
  setScore: (score) => set({ score }),
  setGameRole: (gameRole) => set({ gameRole }),
}));
export default useUserStore;
