import {create} from "zustand";

const useRoomStore = create((set) => ({
    roomId: 0,
    roomUsers: [1, 2, 3, 4],
    setRoomId: (roomId) => set({ roomId }),
    addUser: (userId) => set((state) => ({ roomUsers: [...state.roomUsers, userId] })),
    removeUser: (userId) => set((state) => ({ roomUsers: state.roomUsers.filter((id) => id !== userId) })),
}));
export default useRoomStore;
