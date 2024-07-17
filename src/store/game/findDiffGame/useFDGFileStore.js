import { create } from "zustand";

const useFDGFileStore = create((set)=>({
    uploadFile:'',
    setUploadFile: (uploadFile) => set({uploadFile}),

    originalFile: '',
    setOriginalFile: (originalFile) => set({originalFile}),
}))

export default useFDGFileStore;
