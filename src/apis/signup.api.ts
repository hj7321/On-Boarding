import { AxiosError } from "axios";
import { SignUpDataType } from "../types/data.type";
import { api } from "./api";

export const signUp = async (signUpData: SignUpDataType) => {
  const path = "/register";

  try {
    const response = await api.post(path, signUpData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("회원가입 실패: ", error.response?.data || "응답 없음");
    } else {
      console.error("회원가입 실패 - 알 수 없는 에러: ", error);
    }
    throw error;
  }
};
