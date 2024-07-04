import { useNavigate } from 'react-router-dom';
import './Start.css'

const Start = () => {
  const nav = useNavigate();

  return ( 
    <div className="background">
      <button className="img-button" onClick={() => { nav('/home') }}>
        <img src='/images/btn.png' alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
    </div>
  )
}

export default Start;
