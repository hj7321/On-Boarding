import clsx from "clsx";
import { Notify } from "notiflix";
import { FormEvent, useState } from "react";
import { logIn } from "../apis/login.api";
import { useUserStore } from "../stores/user.store";

const inputStyle =
  "text-black text-[20px] font-bold outline-none px-[10px] py-[5px] rounded-[2px] h-[50px] w-[300px]";

export default function LoginPage() {
  const [throttling, setThrottling] = useState<boolean>(false); // 버튼 연속 클릭 방지
  const { setLogin, nickname } = useUserStore();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setThrottling(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const id: string = formData.get("user-id") as string;
    const password: string = formData.get("user-pw") as string;

    const loginData = { id, password };

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
      setThrottling(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-[40px] mb-[-10px]">🔓</p>
      <h1 className="text-[40px] mb-[50px]">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!throttling) handleLogin(e);
        }}
        className="flex flex-col items-center"
      >
        <section className="flex flex-col gap-[15px] justify-center items-center mb-[40px]">
          <div>
            <label htmlFor="user-id" className="flex gap-[7px] items-center">
              아이디
            </label>
            <input type="text" id="user-id" className={inputStyle} />
          </div>
          <div>
            <label htmlFor="user-pw" className="flex gap-[7px] items-center">
              비밀번호
            </label>
            <input type="password" id="user-pw" className={inputStyle} />
          </div>
        </section>
        <button
          type="submit"
          className={clsx(
            "w-[200px] h-[50px] rounded-[4px]",
            throttling
              ? "hover:cursor-default bg-pink-200 bg-opacity-50 text-opacity-50"
              : "bg-button-basic border-button-basic hover:bg-button-hover hover:border-button-hover hover:font-bold"
          )}
        >
          로그인하기
        </button>
      </form>
    </div>
  );
}
