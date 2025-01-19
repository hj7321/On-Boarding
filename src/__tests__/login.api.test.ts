import { api } from "../apis/api";
import { logIn } from "../apis/login.api";

jest.mock("../apis/api");

describe("Login API", () => {
  it("should store token in localStorage on successful login", async () => {
    const mockResponse = {
      data: {
        accessToken: "test-token",
        nickname: "test-user",
      },
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const loginData = { id: "test-id", password: "test-password" };
    const result = await logIn(loginData);

    expect(localStorage.getItem("accessToken")).toBe("test-token");
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle AxiosError correctly", async () => {
    const mockError = {
      response: { data: "Invalid credentials" },
    };

    (api.post as jest.Mock).mockRejectedValue(mockError);

    await expect(logIn({ id: "test", password: "wrong" })).rejects.toEqual(
      mockError
    );
  });
});
