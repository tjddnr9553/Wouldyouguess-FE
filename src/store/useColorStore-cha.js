import { create } from "zustand";

const useColorStoreCha = create((set) => ({
    color: "black",
    setColor: (color) => set({ color })
}));

export default useColorStoreCha;