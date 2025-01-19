import { api } from "../apis/api";
import { logIn } from "../apis/login.api";

jest.mock("../apis/api");
// api 모듈을 모의(Mock) 모듈로 대체하여 테스트 중 실제 HTTP 요청이 발생하지 않도록 함

describe("Login API", () => {
  // describe는 테스트 스위트를 정의함
  // 여기서는 "Login API"와 관련된 테스트를 그룹화함
  it("should store token in localStorage on successful login", async () => {
    // 첫 번째 테스트: 로그인 성공 시, 액세스 토큰이 localStorage에 저장되는지 확인함함
    const mockResponse = {
      data: {
        accessToken: "test-token", // 모의 응답 데이터: 액세스 토큰
        nickname: "test-user", // 모의 응답 데이터: 사용자 닉네임임
      },
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse);
    // api.post를 Mock으로 설정하여, 호출 시 mockResponse 데이터를 반환하도록 함

    const loginData = { id: "test-id", password: "test-password" };
    // 테스트 입력 데이터: 사용자 ID와 비밀번호

    const result = await logIn(loginData);
    // logIn 함수를 호출함
    // 실제 요청 대신 Mock 응답이 반환됨됨

    expect(localStorage.getItem("accessToken")).toBe("test-token");
    // localStorage에 저장된 액세스 토큰이 예상 값과 동일한지 확인함

    expect(result).toEqual(mockResponse.data);
    // logIn 함수가 반환한 데이터가 Mock 응답 데이터와 동일한지 확인함
  });

  it("should handle AxiosError correctly", async () => {
    // 두 번째 테스트: 잘못된 인증 정보로 인해 오류가 발생할 때, 올바르게 처리되는지 확인함
    const mockError = {
      response: { data: "Invalid credentials" },
      // 모의 오류 객체: 서버에서 반환된 오류 메시지지
    };

    (api.post as jest.Mock).mockRejectedValue(mockError);
    // api.post를 Mock으로 설정하여, 호출 시 오류를 반환하도록 함함

    await expect(logIn({ id: "test", password: "wrong" })).rejects.toEqual(
      mockError
    );
    // logIn 함수가 호출되었을 때, Promise가 오류를 반환하는지 확인함
  });
});
