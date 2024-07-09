import axios from "axios";

export const REST_API_URL = import.meta.env.VITE_KAKAO_APP_API_KEY;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get("code")
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_URL}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_TOKEN_URL = axios.create({
    baseURL: "https://kauth.kakao.com",
    headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
})


export const kakao_login = async (codeParam) => {
    await axios({
        method: "GET",
        url: `http://localhost:8080/auth/kakao/callback?code=${codeParam}`,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
    });
};