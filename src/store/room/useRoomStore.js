import {create} from "zustand";

const useRoomStore = create((set) => ({
    roomId: 0,
    setRoomId: (roomId) => set({ roomId }),
}));
export default useRoomStore;
