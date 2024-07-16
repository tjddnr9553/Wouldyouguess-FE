import { create } from "zustand";
import {
  LocalVideoTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

interface WebRTCState {
  LIVEKIT_URL: string;
  APPLICATION_SERVER_URL: string;

  room: Room | undefined;
  localTrack: LocalVideoTrack | undefined;
  remoteTracks: TrackInfo[];
  participantName: string;
  roomName: string;

  setLIVEKIT_URL: (url: string) => void;
  setAPPLICATION_SERVER_URL: (url: string) => void;
  joinRoom: () => Promise<void>;
  leaveRoom: () => Promise<void>;
  setParticipantName: (name: string) => void;
  setRoomName: (name: string) => void;
  getToken: (roomName: string, participantName: string) => Promise<string>;
}

const useWebrtcStore = create<WebRTCState>((set, get) => {
  // 외부 상태 저장소에서 초기값 가져오기
  return {
    LIVEKIT_URL: "",
    APPLICATION_SERVER_URL: "",
    room: undefined,
    localTrack: undefined,
    remoteTracks: [],
    participantName: "Participant" + Math.floor(Math.random() * 100),
    roomName: "roomId",

    setLIVEKIT_URL: (LIVEKIT_URL) => set({ LIVEKIT_URL }),
    setAPPLICATION_SERVER_URL: (APPLICATION_SERVER_URL) =>
      set({ APPLICATION_SERVER_URL }),

    joinRoom: async () => {
      const { roomName, participantName, getToken, leaveRoom } = get(); // Get necessary values from the store

      const room = new Room({
        adaptiveStream: true, // 적응형 스트리밍 활성화
      });
      set({ room });

      room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
        set((state) => ({
          remoteTracks: [
            ...state.remoteTracks,
            {
              trackPublication: publication,
              participantIdentity: participant.identity,
            },
          ],
        }));
      });

      room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
        set((state) => ({
          remoteTracks: state.remoteTracks.filter(
            (t) => t.trackPublication.trackSid !== publication.trackSid
          ),
        }));
      });

      try {
        const token = await getToken(roomName, participantName);
        await room.connect(get().LIVEKIT_URL, token);

        await room.localParticipant.setCameraEnabled(true);
        set({
          localTrack: room.localParticipant.videoTrackPublications
            .values()
            .next().value.videoTrack,
        });
      } catch (error) {
        console.error("Error joining room:", (error as Error).message);
        await leaveRoom(); // Use the leaveRoom action directly
      }
    },
    leaveRoom: async () => {
      const { room } = get(); // Get the room object
      await room?.disconnect();
      set({ room: undefined, localTrack: undefined, remoteTracks: [] });
    },
    setParticipantName: (name: string) => set({ participantName: name }),
    setRoomName: (name: string) => set({ roomName: name }),
    getToken: async (roomName: string, participantName: string) => {
      const response = await fetch(get().APPLICATION_SERVER_URL + "/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          participantName: participantName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to get token: ${error.errorMessage}`);
      }

      const data = await response.json();
      return data.token;
    },
  };
});

export default useWebrtcStore;
