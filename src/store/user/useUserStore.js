import { create } from "zustand";

const useUserStore = create((set) => ({
  userId: 0,
  username: "",
  nickname: "",
  accessToken: "",
  isLogin: false,
  isInvite: false,

  rank: 0,
  score: 0,
  gameRole: "drawer", // drawer, watcher

  setUserId: (userId) => set({ userId }),
  setUsername: (username) => set({ username }),
  setNickname: (nickname) => set({ nickname }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsLogin: (isLogin) => set({isLogin}),
  setIsInvite: (isInvite) => set({isInvite}),

  setRank: (rank) => set({ rank }),
  setScore: (score) => set({ score }),
  setGameRole: (gameRole) => set({ gameRole }),
}));
export default useUserStore;
