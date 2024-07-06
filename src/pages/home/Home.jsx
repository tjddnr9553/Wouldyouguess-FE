import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const nav = useNavigate();

  return ( 
    <div className="background">
      <button className="img-button" onClick={() => { nav('/lobby') }}>
        <img src='/images/btn.png' alt="btn" className="btn-img" />
        <div className="btn-start">START</div>
      </button>
    </div>
  )
}

export default Home;
