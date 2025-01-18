import { AxiosError } from "axios";
import { api } from "./api";

export const checkProfile = async () => {
  try {
    const response = await api.get("/user");
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "회원정보 확인 실패: ",
        error.response?.data || "응답 없음"
      );
    } else {
      console.error("회원정보 확인 실패 - 알 수 없는 에러: ", error);
    }
    throw error;
  }
};
export const changeProfile = async (formData: FormData) => {
  try {
    const response = await api.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("프로필 변경 실패: ", error.response?.data || "응답 없음");
    } else {
      console.error("프로필 변경 실패 - 알 수 없는 에러: ", error);
    }
    throw error;
  }
};
