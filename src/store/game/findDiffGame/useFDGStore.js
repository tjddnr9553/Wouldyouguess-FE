import { create } from "zustand";

const useFDGStore = create((set) => ({
    mode: 'upload',
    setMode: (mode) => set({mode}),
    findDiffGameId: 0,
    setFindDiffGameId: (findDiffGameId) => set({ findDiffGameId }),
    clickSendBtn: false,
    setClickSendBtn: (clickSendBtn) => set({clickSendBtn}),
    round: 1,
    setNextRound: () => set((state) => ({
        round: state.round + 1,
    })),
    chance: 3,
    setChance: (chance) => set({chance}),
    correctCount: 0,
    setCorrectCount: () => set((state) => ({
        correctCount: state.correctCount + 1,
    })),
    remainingTime: 0,
    setRemainingTime: (remainingTime) => set({remainingTime}),
    round1: {
        remainingChance: 0,
    },
    round2: {
        remainingChance: 0,
    },
    round3: {
        remainingChance: 0,
    },
    setRemainingChance: (round, chance) => set({
        [round]: {
            remainingChance: chance
        }
    }),
}));

export default useFDGStore;