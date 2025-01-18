import { AxiosError } from "axios";
import { LoginDataType } from "../types/data.type";
import { api } from "./api";

export const logIn = async (loginData: LoginDataType) => {
  const path = "/login?expiresIn=10m";

  try {
    const response = await api.post(path, loginData);
    const data = response.data;
    const { accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("로그인 실패: ", error.response?.data || "응답 없음");
    } else {
      console.error("로그인 실패 - 알 수 없는 에러 발생: ", error);
    }
    throw error;
  }
};
