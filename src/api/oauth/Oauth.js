import axios from "axios";

export const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;
export const REST_API_URL = import.meta.env.VITE_KAKAO_APP_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_KAKAO_APP_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_URL}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const AUTHORIZATION_CODE = new URL(
    document.location.toString()
).searchParams.get("code");

export const KAKAO_TOKEN_URL = axios.create({
  baseURL: "https://kauth.kakao.com",
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});


export const auth_kakao_callback = async (codeParam) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_SERVER_URL}/auth/kakao/callback?code=${codeParam}`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      }
    });

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}