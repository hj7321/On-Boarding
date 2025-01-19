import axios from "axios";
import { logIn } from "../apis/login.api";

jest.mock("axios");
// Jest의 mocking 기능을 사용해 axios를 모의(mock) 객체로 대체함
// 이렇게 하면 실제 HTTP 요청을 보내지 않고도 테스트를 수행할 수 있음

const mockedAxios = axios as jest.Mocked<typeof axios>;
// axios를 Jest의 Mocked 타입으로 캐스팅하여, mocking된 axios 객체를 사용함함

describe("logIn 함수 테스트", () => {
  // describe 블록은 "logIn 함수 테스트"라는 그룹 내에서 테스트를 작성함

  it("로그인 성공 시 액세스 토큰이 저장됨", async () => {
    // it 함수는 테스트 케이스를 정의함
    // 여기서는 "로그인 성공 시 액세스 토큰이 저장된다"는 시나리오를 테스트함

    const mockResponse = { data: { accessToken: "test-token" } };
    // 성공적인 로그인 응답을 모의(mock)함
    // 액세스 토큰이 포함된 객체임

    mockedAxios.post.mockResolvedValue(mockResponse);
    // axios의 post 메서드가 호출되었을 때, 위에서 정의한 mockResponse를 반환하도록 설정함

    const loginData = { id: "test123", password: "abc123!@#" };
    // 로그인에 사용될 모의 데이터를 정의함

    const response = await logIn(loginData);
    // logIn 함수를 호출하여, 로그인 요청을 보냄
    // 여기서는 실제로 HTTP 요청이 아닌 모의 요청을 보냄

    expect(mockedAxios.post).toHaveBeenCalledWith("/login", loginData);
    // axios.post가 특정 URL과 데이터를 사용하여 호출되었는지 확인함

    expect(localStorage.getItem("accessToken")).toBe("test-token");
    // localStorage에 액세스 토큰이 올바르게 저장되었는지 확인함

    expect(response).toEqual(mockResponse.data);
    // logIn 함수가 반환한 응답이 mockResponse의 데이터와 동일한지 확인함
  });

  it("로그인 실패 시 에러가 처리됨", async () => {
    // 두 번째 테스트 케이스로, "로그인 실패 시 에러가 처리된다"는 시나리오를 테스트함

    mockedAxios.post.mockRejectedValue({
      response: { data: "로그인 실패" },
      // 에러 응답 데이터는 "로그인 실패" 문자열을 포함함함
    });

    const loginData = { id: "test123", password: "abc" };
    // 실패를 유발할 모의 로그인 데이터를 정의함

    await expect(logIn(loginData)).rejects.toThrow();
    // logIn 함수 호출이 예외를 throw하는지 확인함

    expect(console.error).toHaveBeenCalledWith(
      // console.error가 특정 에러 메시지와 함께 호출되는지 확인함
      "[logIn] 로그인 실패: ", // 첫 번째 로그 메시지 부분
      "로그인 실패" // 두 번째 로그 메시지 부분 (mockedAxios.post에서 반환된 에러 메시지지)
    );
  });
});
