import { useEffect, useRef,useState } from 'react';
import './Clock.css'
import Counter from './Counter';

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
    semicircle.addEventListener('animationend', handleTransitionEnd);

    const semicircleL = semicircleLeftRef.current;
    semicircleL.addEventListener('animationend', handleLeft);

    return () => {
      semicircle.removeEventListener('animationend', handleTransitionEnd);
    };
  }, [])

  return (
    <>
      <div className="clock main-container">
        <div className="circle-container">
          <div 
            ref={semicircleLeftRef}
            style={{ display: isDoneLeft ? 'none' : 'block' }} 
            className={`semicircle left-circle ${showLeftClock ? 'show' : ''}`}></div>
          <div 
            ref={semicircleRef} 
            style={{ display: showRightClock ? 'block' : 'none' }}  
            className="semicircle right-circle"></div> 
          <div
            style={{display : showHiddenImg ? 'block' : 'none'}} 
            className="hidden-img"></div>
        </div>
        <Counter countDown={30} />
      </div>
    </>
  )
}

export default Clock;