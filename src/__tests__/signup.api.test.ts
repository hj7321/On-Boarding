import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { api } from "../apis/api";
import { signUp } from "../apis/signup.api";

// AxiosError 확장
interface ExtendedAxiosError extends AxiosError {
  name: string; // name 속성 추가
  message: string; // message 속성 추가
}

jest.mock("../apis/api");

describe("SignUp API", () => {
  it("should return user data on successful sign up", async () => {
    const mockResponse = {
      data: {
        nickname: "test-user",
        avatar: "test-avatar",
        message: "User created successfully",
      },
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse); // 모의된 응답 설정

    const signUpData = {
      id: "test-id",
      password: "test-password",
      nickname: "test-user",
    };
    const result = await signUp(signUpData);

    expect(result).toEqual(mockResponse.data);
    expect(api.post).toHaveBeenCalledWith("/register", signUpData); // 호출 확인
  });

  it("should handle AxiosError correctly", async () => {
    const mockError: ExtendedAxiosError = {
      isAxiosError: true,
      toJSON: jest.fn(),
      name: "AxiosError", // name 속성 추가
      message: "User already exists", // message 속성 추가
      response: {
        data: "User already exists",
        status: 400,
        statusText: "Bad Request",
        headers: {} as AxiosHeaders,
        config: {} as InternalAxiosRequestConfig,
      } as AxiosResponse,
      config: {} as InternalAxiosRequestConfig,
    };

    (api.post as jest.Mock).mockRejectedValue(mockError); // 모의된 오류 설정

    const signUpData = {
      id: "existing-id",
      password: "test-password",
      nickname: "test-user",
    };

    await expect(signUp(signUpData)).rejects.toEqual(mockError);
  });

  it("should log error if non-AxiosError occurs", async () => {
    const mockError = new Error("Unknown error");

    (api.post as jest.Mock).mockRejectedValue(mockError);

    const signUpData = {
      id: "test-id",
      password: "test-password",
      nickname: "test-user",
    };

    await expect(signUp(signUpData)).rejects.toThrow("Unknown error");
  });
});
