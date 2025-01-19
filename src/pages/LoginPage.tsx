import { Notify, Report } from "notiflix";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { logIn } from "../apis/login.api";
import AuthForm from "../components/AuthForm";
import { LOGIN_INPUTS } from "../constants/inputs";
import { useAuthForm } from "../hooks/useAuthForm";
import { useUserStore } from "../stores/user.store";

export default function LoginPage() {
  const {
    inputValues,
    inputRefs,
    errorMsgs,
    throttling,
    setThrottling,
    handleInputChange,
  } = useAuthForm(LOGIN_INPUTS);
  const { isLoggedIn, setLogin, nickname } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    const areInputValuesNull: string[] = inputValues.filter(
      (value) => value === ""
    );

    if (areInputValuesNull.length !== 0) {
      return Report.failure(
        "<b>로그인 실패</b>",
        "<p style='text-align: center; font-size: 16px'>회원 정보를 모두 기입해주세요.</p>",
        "확인",
        {
          titleFontSize: "22px",
          messageFontSize: "16px",
          fontFamily: "SUIT-Regular",
          cssAnimationDuration: 800,
          plainText: false,
        }
      );
    } else if (errorMsgs.some((msg) => msg !== "")) {
      inputRefs.current[errorMsgs.findIndex((msg) => msg !== "")]!.focus();
      return;
    } else {
      setThrottling(true); // 버튼 한 번 클릭시 즉시 버튼 비활성화
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const id: string = formData.get("user-id") as string;
    const password: string = formData.get("user-pw") as string;

    const loginData = { id, password };

    // 요청 로직
    try {
      const response = await logIn(loginData);
      setLogin(response.nickname, response.avatar);
      Notify.success(`${nickname}님, 환영합니다!`, {
        width: "260px",
        fontSize: "16px",
        fontFamily: "SUIT-Regular",
        cssAnimationDuration: 800,
      });
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      Notify.failure("로그인에 실패했습니다. 다시 시도해 주세요.", {
        width: "370px",
        fontSize: "16px",
        fontFamily: "SUIT-Regular",
        cssAnimationDuration: 800,
      });
    } finally {
      setThrottling(false); // 요청 완료 후 버튼 다시 활성화
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-[40px] mb-[-10px]">🔓</p>
      <h1 className="text-[40px] mb-[50px]">Login</h1>
      <AuthForm
        inputs={LOGIN_INPUTS}
        onSubmit={(e) => {
          e.preventDefault();
          if (!throttling) handleLogin(e);
        }}
        throttling={throttling}
        handleInputChange={handleInputChange}
        inputValues={inputValues}
        errorMsgs={errorMsgs}
        inputRefs={inputRefs}
      />
    </div>
  );
}
