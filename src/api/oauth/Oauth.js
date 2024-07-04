import axios from "axios";

export const API_KEY = import.meta.env.VITE_KAKAO_APP_API_KEY;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const AUTHORIZATION_CODE = new URL(document.location.toString()).searchParams.get("code")
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const KAKAO_TOKEN_URL = axios.create({
    baseURL: "https://kauth.kakao.com",
    headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
})