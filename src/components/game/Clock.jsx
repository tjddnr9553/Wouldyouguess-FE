import { useEffect, useRef,useState } from 'react';
import './Clock.css'

const Clock = () => {
  const [showLeftClock, setShowLeftClock] = useState(false);
  const [showRightClock, setShowRightClock] = useState(true);
  const [showHiddenImg, setShowHiddenImg] =useState(false);
  const [isDoneLeft, setIsDoneLeft] = useState(false);


  const semicircleRef = useRef(null);
  const semicircleLeftRef = useRef(null);

  const handleTransitionEnd = () => {
    setShowLeftClock(true);
    setShowRightClock(false);
    setShowHiddenImg(true);
  }

  const handleLeft = () => {
    setIsDoneLeft(true);
  }

  useEffect(() => {
    const semicircle = semicircleRef.current;
    semicircle.addEventListener('transitionend', handleTransitionEnd);

    const semicircleL = semicircleLeftRef.current;
    semicircleL.addEventListener('transitionend', handleLeft);

    return () => {
      semicircle.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [])

  return (
    <div className="main-container center">
      <div className="circle-container container center">
        <div 
          ref={semicircleLeftRef}
          style={{transform: showLeftClock ? 'rotate(180deg)' : 'rotate(0deg)',
            display: isDoneLeft ? 'none' : 'block'
           }}
          className="semicircle left"></div>
        <div 
          ref={semicircleRef} 
          style={{ display: showRightClock ? 'block' : 'none' }}  
          className="semicircle right"></div> 
        <div
          style={{display : showHiddenImg ? 'block' : 'none'}} 
          className="hidden-img"></div>
          

        <div className="clock-border">
          <img className="mars" src="../clock-planet.png" alt="mars" />
        </div>
      </div>
    </div>
  )
}

export default Clock;