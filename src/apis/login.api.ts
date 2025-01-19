import { AxiosError } from "axios";
import { LoginDataType } from "../types/data.type";
import { api } from "./api";

// const EXPIRES_IN = import.meta.env.VITE_TOKEN_EXPIRES_IN;
// const EXPIRES_IN = process.env.VITE_TOKEN_EXPIRES_IN;
const EXPIRES_IN = 3600;

export const logIn = async (loginData: LoginDataType) => {
  const path = `/login?expiresIn=${EXPIRES_IN}`;

  try {
    const response = await api.post(path, loginData);
    const data = response.data;
    const { accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    console.log("[logIn] 로그인 데이터: ", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "[logIn] 로그인 실패: ",
        error.response?.data || "응답 없음"
      );
    } else {
      console.error("[logIn] 로그인 실패 - 알 수 없는 에러 발생: ", error);
    }
    throw error;
  }
};
