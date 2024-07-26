import "./Vote_new.css";
import React, {useEffect, useState} from "react";

import VideoComponent from "../../components/webrtc/VideoComponent";
import AudioComponent from "../../components/webrtc/AudioComponent";
import VoteGaugebar from "./VoteGaugebar.jsx";
import GameOver from "./GameOver.jsx";

import useUserStore from "../../store/user/useUserStore.js";
import useRoomStore from "../../store/room/useRoomStore.js";
import useCatchLiarStore from "../../store/game/useCatchLiarStore.js";
import useSocketStore from "../../store/socket/useSocketStore.js";
import useWebrtcStore from "../../store/webrtc/useWebrtcStore.tsx";
import useAudioStore from "../../store/bgm/useAudioStore.js";

import {catchLiar_vote, catchLiar_vote_candidates} from "../../api/game/CatchLiar.js";

const Vote_new = () => {
    const [gameStart, setGameStart] = useState(true); // 게임 시작 상태, 30초 시작
    const [players, setPlayers] = useState([]);
    const [playersCam, setPlayersCam] = useState([]);
    const [voteCounts, setVoteCounts] = useState({});

    const { userId, username } = useUserStore();
    const { roomId } = useRoomStore();
    const { gameId,  myVotingUserId, votePageShowGameOver, setMyVotingUserId } = useCatchLiarStore();
    const { socket } = useSocketStore();
    const { localTrack, remoteTracks } = useWebrtcStore();
    const { stop } = useAudioStore();

    useEffect(() => {
        const sync_func = async () => {
            const res = await catchLiar_vote_candidates(gameId);
            setPlayers(res.sort((a, b) => a.userId - b.userId));

            const initialVotes = res.reduce((dict, player) => {
                dict[player.userId] = 0;
                return dict;
            }, {});
            setVoteCounts(initialVotes);
        };
        stop();
        sync_func();
    }, []);

    useEffect(() => {
        socket?.on("game_voting", (data) => {
            const { votingUserId, previousVotingUserId } = data;

            setVoteCounts(prevVoteCounts => {
                const newVoteCounts = { ...prevVoteCounts };

                if (previousVotingUserId > 0) {
                    newVoteCounts[previousVotingUserId] = (newVoteCounts[previousVotingUserId] || 0) - 1;
                }

                if (votingUserId > 0) {
                    newVoteCounts[votingUserId] = (newVoteCounts[votingUserId] || 0) + 1;
                }

                return newVoteCounts;
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

    useEffect(() => {
        const sync_func = async () => {
            await catchLiar_vote(gameId, myVotingUserId);
        }

        if (!votePageShowGameOver) return;
        sync_func();
        setMyVotingUserId(0);
    }, [votePageShowGameOver])

    const liarVote = async (e) => {
        const votingUserId = Number(e.currentTarget.getAttribute("data-user-id"));
        socket?.emit("game_voting", { roomId, userId, votingUserId, previousVotingUserId : myVotingUserId });
        setMyVotingUserId(votingUserId);
    };

    return (
        <div className="vote-container-wrap">
            {votePageShowGameOver && <GameOver />}
            <div className="vote-gaugebar-wrap">
                <VoteGaugebar gameStart={gameStart} setGameStart={setGameStart} />
            </div>

            <div className="vote-container">
                <div className="vote-title-container">
                    <strong className="vote-title">Vote</strong>
                </div>

                <div className="vote-image-container">
                    {players && players.map((player, index) => {
                        const color = player.userColor;
                        const boxShadowStyle = `0 0 15px 15px ${color}`;
                        const isCurrentUser = player.userId === userId;
                        const absolutePosition = index % 2 === 1 ? "vote-camera-wrap-right" : "vote-camera-wrap-left";

                        return (
                            <div
                                key={index}
                                data-user-id={player.userId}
                                className="vote-user-painting-image-wrap"
                                style={{boxShadow: boxShadowStyle}}
                                onClick={liarVote}
                            >
                                <div className="vote-voted-cnt">
                                    <strong>{voteCounts && voteCounts[player.userId]}</strong>
                                </div>
                                {isCurrentUser ? (
                                    <>
                                        <VideoComponent
                                            track={localTrack}
                                            participantIdentity={username}
                                            color={color}
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
                                                            color={color}
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