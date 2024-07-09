import {create} from "zustand";

const useRoomStore = create((set) => ({
    roomId: 1,
    roomUsers: [1, 2, 3, 4],
    setRoomId: (rood_id) => set({ rood_id }),
    addUser: (userId) => set((state) => ({ roomUsers: [...state.roomUsers, userId] })),
    removeUser: (userId) => set((state) => ({ roomUsers: state.roomUsers.filter((id) => id !== userId) })),
}));
export default useRoomStore;
