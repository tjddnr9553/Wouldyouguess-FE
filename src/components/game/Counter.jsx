import { useEffect, useState } from "react"

const Counter = ({countDown, onCountdownComplete}) => {
  const [count, setCount] = useState(countDown);

  useEffect(() => {
    const count_obj = setInterval(() => {
      setCount(count => count - 1); 
    }, 1000);

    if(count === 0){
      clearInterval(count_obj);
      onCountdownComplete();
    }

    return () => clearInterval(count_obj);
  }, [count])

  return(
    <h1 className="counter">{count}</h1>
  )
}

export default Counter;