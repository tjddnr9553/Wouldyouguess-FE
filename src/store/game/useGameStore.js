import { create } from "zustand";

const useGameStore = create((set) => ({
  mode: 'upload',
  setMode: (mode) => set({mode}),
  findDiffGameId: 0,
  setFindDiffGameId: (findDiffGameId) => set({ findDiffGameId }),
  round: 1,
  setRound: () => set((state) => ({
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
  canvasWrapperHeight : '',
  setCanvasWrapperHeight : (canvasWrapperHeight) => set( {canvasWrapperHeight} ),
  canvasWrapperWidth: '',
  setCanvasWrapperWidth: (canvasWrapperWidth) => set( {canvasWrapperWidth} ),
  isImgUploaded: false,
  setIsImgUploaded: (isImgUploaded) => set({isImgUploaded}),
}))

export const useFileStore = create((set)=>({
  file:'',
  setFile: (file) => set({file}),
  uploadForm: '',
  setUploadForm: (uploadForm) => set({uploadForm}),
  inpaintForm: '',
  setInpaintForm: (inpaintForm) => set({inpaintForm}),
}))

export default useGameStore;