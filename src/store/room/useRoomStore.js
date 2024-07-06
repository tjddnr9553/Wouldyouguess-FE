import { create } from "zustand";

const useRoomStore = create((set) => ({
    room_id: null,
    setRoomId: (rood_id) => set({ rood_id }),
}));
export default useRoomStore;
