import { useEffect, useRef,useState } from 'react';
import './Star.css'

const Star = () => {
  const [stars, setStars] = useState([]);

  const makeStars = () => {
    const maxSize = Math.max(window.innerWidth, window.innerHeight);

    const getRandomX = () => Math.random() * maxSize;
    const getRandomY = () => Math.random() * maxSize;
    const randomRadius = () => Math.random() * 0.7 + 0.6;

    const _size = Math.floor(maxSize / 2);

    const starsArray = new Array(_size).fill().map((_, i) => ({
      cx: getRandomX(),
      cy: getRandomY(),
      r: randomRadius(),
      id: i
    }));

    setStars(starsArray);
  };

  useEffect(() => {
    makeStars();
    window.addEventListener('resize', makeStars);

    return () => {
      window.removeEventListener('resize', makeStars);
    };
  }, []);
  
  return (
    <>
      <div className="backSky">
        <svg  className="sky">
          {stars.map((star) => (
            <circle
              key={star.id}
              className="star"
              cx={star.cx}
              cy={star.cy}
              r={star.r}
            />
          ))}
        </svg>
      </div>
    </>
  )
}

export default Star;