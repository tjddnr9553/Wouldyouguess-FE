import { create } from "zustand";

const useUserStore = create((set) => ({
  userId: null,
  isLogin: false,
  isInvited: false,
  participateRoomId: 0,
  nickname: "김광윤",
  username: "김광윤",
  accessToken: "",
  rank: 0,
  score: 0,
  gameRole: "drawer", // drawer, watcher

  setUserId: (userId) => set({ userId }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setIsInvited: (isInvited) => set({ isInvited }),
  setParticipateRoomId: (participateRoomId) => set({ participateRoomId }),
  setNickname: (nickname) => set({ nickname }),
  setUsername: (username) => set({ username }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRank: (rank) => set({ rank }),
  setScore: (score) => set({ score }),
  setGameRole: (gameRole) => set({ gameRole }),
}));
export default useUserStore;
