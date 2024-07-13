import create from 'zustand';

const useAudioStore = create((set) => ({
  isPlaying: false,
  currentTrack: null,
  play: (track) => set({ isPlaying: true, currentTrack: track }),
  stop: () => set({ isPlaying: false, currentTrack: null }),
}));

export default useAudioStore;