import { create } from 'zustand'

export const useCanvasStore = create((set)=>({
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
