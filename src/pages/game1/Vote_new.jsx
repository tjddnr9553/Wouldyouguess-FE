import "./Vote_new.css";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import useAudioStore from "../../store/bgm/useAudioStore.js";
import {catchLiar_vote, catchLiar_vote_candidates} from "../../api/game/CatchLiar.js";
import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";


const colors = [
    "blue",
    "purple",
    "green",
    "red",
];

const Vote_new = () => {
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [playersCam, setPlayersCam] = useState([]);
    const [votes, setVotes] = useState({});
    const [voteCounts, setVoteCounts] = useState({});

    const { userId, username } = useUserStore();
    const { roomId } = useRoomStore();
    const { gameId } = useCatchLiarStore();
    const { socket } = useSocketStore();
    const { localTrack, remoteTracks } = useWebrtcStore();
    const { play, stop } = useAudioStore();

    useEffect(() => {
        play("/bgm/Game1_bgm.mp3");
        return () => {
            stop();
        };
    }, []);

    useEffect(() => {
        const sync_func = async () => {
            const res = await catchLiar_vote_candidates(gameId);
            setPlayers(res.sort((a, b) => a.userId - b.userId));

            const initialVotes = res.reduce((dict, player) => {
                dict[player.userId] = 0;
                return dict;
            }, {});
            setVotes(initialVotes);
            setVoteCounts(initialVotes);
        };

        sync_func();
    }, []);

    useEffect(() => {
        socket?.on("game_voting", (data) => {
            const { userId, votingUserId } = data;
            setVotes(prevVotes => {
                const newVotes = { ...prevVotes, [userId]: votingUserId };

                const newVoteCounts = Object.values(newVotes).reduce((acc, votedUserId) => {
                    if (votedUserId) {
                        acc[votedUserId] = (acc[votedUserId] || 0) + 1;
                    }
                    return acc;
                }, {});

                setVoteCounts(newVoteCounts);
                return newVotes;
            });
        });

        return () => {
            socket?.off("game_voting");
        };
    }, [socket]);

    useEffect(() => {
        const sortedRemoteTracks = remoteTracks.sort((a, b) => {
            const idA = Number(a.participantIdentity);
            const idB = Number(b.participantIdentity);
            return idA - idB;
        })
        setPlayersCam(sortedRemoteTracks);
    }, [remoteTracks])

    const liarVote = async (e) => {
        const votingUserId = Number(e.currentTarget.getAttribute("data-user-id"));
        socket?.emit("game_voting", { roomId, userId, votingUserId });
    };

    return (
        <div className="vote-container-wrap">
            <div className="vote-container">
                {/* 게이지바 추가 */}

                <div className="vote-title-container">
                    <strong className="vote-title">Vote</strong>
                </div>

                <div className="vote-image-container">
                    {players && players.map((player, index) => {
                        const boxShadowStyle = `0 0 15px 15px ${colors[index]}`;
                        const isCurrentUser = player.userId === userId;
                        const absolutePosition = index % 2 === 1 ? "vote-camera-wrap-right" : "vote-camera-wrap-left";
                        const colorIndex = index;

                        return (
                            <div
                                key={index}
                                data-user-id={player.userId}
                                className="vote-user-painting-image-wrap"
                                style={{boxShadow: boxShadowStyle}}
                                onClick={liarVote}
                            >
                                <div className="vote-voted-cnt">{voteCounts && voteCounts[player.userId]}</div>
                                {isCurrentUser ? (
                                    <>
                                        <VideoComponent
                                            track={localTrack}
                                            participantIdentity={username}
                                            color={colors[colorIndex]}
                                            classNameCss={absolutePosition}
                                        />
                                        <img src={player.imagePath} className="vote-paint-img" alt={`${player.userId} image`} />
                                    </>
                                ) : (
                                    <>
                                        {playersCam.map((remoteTrack) => {
                                            if (String(remoteTrack.participantIdentity) === String(player.userId)) {
                                                return remoteTrack.trackPublication.kind === "video" ? (
                                                    <React.Fragment key={remoteTrack.trackPublication.trackSid}>
                                                        <VideoComponent
                                                            track={remoteTrack.trackPublication.videoTrack}
                                                            participantIdentity={remoteTrack.participantIdentity}
                                                            color={colors[colorIndex]}
                                                            classNameCss={absolutePosition}
                                                        />
                                                        <img src={player.imagePath} className="vote-paint-img"
                                                             alt={`${player.userId} image`}/>
                                                    </React.Fragment>
                                                ) : (
                                                    <AudioComponent
                                                        key={remoteTrack.trackPublication.trackSid}
                                                        track={remoteTrack.trackPublication.audioTrack}
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

}

export default Vote_new;