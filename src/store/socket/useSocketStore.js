import { Socket } from "socket.io-client";
import { create } from "zustand";

// interface SocketStore {
//     socket: Socket | null;
//     setSocket: (socket: Socket | null) => void;
// }

const useSocketStore = create((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
}));

export default useSocketStore;