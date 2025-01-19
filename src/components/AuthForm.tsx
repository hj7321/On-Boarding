import clsx from "clsx";
import { FormEvent } from "react";

const inputStyle =
  "text-black text-[20px] font-bold outline-none px-[10px] py-[5px] rounded-[2px] h-[50px] w-[320px]";

interface AuthFormProps {
  inputs: { id: string; label: string; type: string }[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  throttling: boolean;
  handleInputChange: (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  inputValues: string[];
  errorMsgs: string[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export default function AuthForm({
  inputs,
  onSubmit,
  throttling,
  handleInputChange,
  inputValues,
  errorMsgs,
  inputRefs,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <section className="flex flex-col gap-[15px] justify-center items-center mb-[40px]">
        {inputs.map((input, idx) => (
          <div>
            <label htmlFor={input.id} className="flex gap-[7px] items-center">
              {input.label}
            </label>
            <input
              type={input.type}
              id={input.id}
              name={input.id}
              value={inputValues[idx] || ""}
              onChange={(e) => handleInputChange(idx, e)}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              className={inputStyle}
            />
            <p
              className={
                errorMsgs[idx].length > 0
                  ? "text-[14px] mt-[3px] text-red-500"
                  : "hidden"
              }
            >
              {errorMsgs[idx]}
            </p>
          </div>
        ))}
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
        {inputs.length >= 3 ? "회원가입하기" : "로그인하기"}
      </button>
    </form>
  );
}
