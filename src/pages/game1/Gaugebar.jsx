import { useNavigate, useSearchParams } from 'react-router-dom';
import './Gaugebar.css'
import useSocketStore from '../../store/socket/useSocketStore';
import useRoomStore from '../../store/room/useRoomStore';
import useUserStore from '../../store/user/useUserStore';
import { useCanvasStore } from '../../store/canvas/useCanvasStore';
import useCatchLiarStore from '../../store/game/useCatchLiarStore';
import { useEffect, useRef } from 'react';
import { catchLiar_image_upload } from '../../api/game/CatchLiar';
import gsap from 'gsap';

const Gaugebar = ({gameStart, setGameStart}) => {
  const loaderRef = useRef(null);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const round = Number(searchParams.get('round'));

  const { socket } = useSocketStore();
  const { userId } = useUserStore();
  const { roomId } = useRoomStore();
  const { canvas } = useCanvasStore();
  const { gameId, isDrawing, totalRound, setImageKey, setImagePath } = useCatchLiarStore();

  useEffect(() => {
    if (gameStart) {
      gsap.to(".loader", 
        {
          width: '99.9%',
          backgroundColor: 'red',
          duration: 30,
          onComplete: () => {
            handleCountdownComplete();
            setGameStart(false);
          }
        })
    } else {
      gsap.killTweensOf(".loader");
    }
    
  }, [gameStart])

  useEffect(() => {
    socket?.on("game_round_change", (data) => {
      const { gameId, round } = data;
      navigate(`/game1?gameId=${gameId}&round=${round + 1}`)
    });

    socket?.on("game_end", () => {
      navigate(`/game1/vote`);
    });

    return () => {
      socket?.off("game_round_change", (data) => {
        const { gameId, round } = data;
        navigate(`/game1?gameId=${gameId}&round=${round + 1}`);
      });

      socket?.off("game_end", () => {
        navigate(`/game1/vote`);
      });
    }
  }, [socket])

  const handleCountdownComplete = async () => {
    if (!isDrawing) return ;

    await canvas.toBlob( async (blob) => {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('catchLiarGameId', gameId);
      formData.append('file', blob, 'image.png');

      const res = await catchLiar_image_upload(formData);
      setImageKey(res.imageKey);
      setImagePath(res.imagePath);

      if (round < totalRound) {
        socket?.emit("game_round_change", { roomId, gameId, round });
      } else {
        socket?.emit("game_end", { roomId });
      }
    }, 'image/png');
  }

  return (
    <div className={`gaugebar ${gameStart ? 'start' : ''}`} >
      <div className={`loader ${gameStart ? 'start' : ''}`} ref={loaderRef} >
        <img src="/images/game/rocket.svg" className={`rocket ${gameStart ? 'start' : ''}`} />
      </div>
    </div>
  )
}

export default Gaugebar;