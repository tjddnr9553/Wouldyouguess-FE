import { create } from "zustand";

const useUserStore = create((set) => ({
    userId: 0,
    nickname: "김광윤",
    accessToken: "",
    rank: 0,
    score: 0,
    roomId: 0,
    gameRole: "drawer", // drawer, watcher
    isLogin: false,
    participateRoomId:0,
    isInvited: false,

    setUserId: (userId) => set({ userId }),
    setNickname: (nickname) => set({ nickname }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setRank: (rank) => set({ rank }),
    setScore: (score) => set({ score }),
    setRoomId: (roomId) => set({ roomId }),
    setGameRole: (gameRole) => set({ gameRole }),
    setIsLogin: (isLogin) => set({ isLogin }),
    setParticipateRoomId: (participateRoomId) => set({ participateRoomId }),
}));
export default useUserStore;
