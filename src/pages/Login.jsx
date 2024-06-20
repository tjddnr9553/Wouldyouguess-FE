import { useNavigate } from 'react-router-dom'
import PROFILTE from '../assets/profile.png'
import './Login.css'

const Login = () => {
  const nav = useNavigate();

  return (
    <div className="login">
      <div className="profile_img_wrap">
        <img src={PROFILTE} alt="login_img" />
      </div>

      <div className="login_form">
        <h4>LOGIN</h4>
        <div className="form_group">
          <div className="id_emoticon"></div>
          <input type="text" className="id" placeholder='Username'/>
        </div>
        <div className="form_group">
          <div className="pw_emoticon"/>  
          <input type="text" className="pw" placeholder='Pasward'/>
        </div>
        <button onClick={() => {nav("/")}}className="loginBtn">LOGIN</button>
        <a className="signUp">Forgot Username / Passward?</a>
      </div>
    </div>
  )
}

export default Login;