import axios from "axios";

// const BASE_URL = "https://moneyfulpublicpolicy.co.kr";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 액세스 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("401 Unauthorized - 토큰 만료 또는 권한 없음");
      localStorage.removeItem("accessToken"); // 토큰 삭제
      window.location.href = "/login"; // 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);
