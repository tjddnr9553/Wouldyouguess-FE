import { create } from "zustand";

const useGameStore = create((set) => ({
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

export const useCanvasStore = create((set)=>({
  x: '',
  setX: (x) => set({x}),
  y: '',
  setY: (y) => set({y}),
  isImgUploaded: false,
  setIsImgUploaded: (isImgUploaded) => set({isImgUploaded}),
  isMaskingComplete: false,
  setIsMaskingComplete: (isMaskingComplete) => set({isMaskingComplete}),
}))

export const useFileStore = create((set)=>({
  file:'',
  setFile: (file) => set({file}),
  uploadForm: new FormData(),
  updateUploadForm: (key, value) => set(state => {
    const formData = state.uploadForm;
    formData.append(key, value);
    return {uploadForm: formData};
  }),
  inpaintForm: new FormData(),
  updateInpaintForm: (key, value) => set(state => {
    const formData = state.inpaintForm;
    formData.append(key, value);
    return {inpaintForm: formData};
  }),
}))

export default useGameStore;