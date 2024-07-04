import axios from "axios"
import { KAKAO_AUTH_URL, KAKAO_TOKEN_URL } from "../../api/oauth/Oauth.js"

const Login = () => {
    return (
        <div>
            로그인 페이지
            <button onClick={() => { window.location.href = KAKAO_AUTH_URL }}>
                로그인 하기
            </button>
        </div>
    )
}

export default Login;