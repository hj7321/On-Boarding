import { useRef, useState } from "react";
import { validateForms } from "../utils/validateForms";

export const useAuthForm = (
  inputs: { id: string; type: string; label: string }[]
) => {
  const [inputValues, setInputValues] = useState<string[]>(
    Array(inputs.length).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMsgs, setErrorMsgs] = useState<string[]>(
    Array(inputs.length).fill("")
  );
  const [throttling, setThrottling] = useState<boolean>(false); // 버튼 연속 클릭 방지

  const handleInputChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValues = [...inputValues];
    newValues[idx] = e.target.value;
    setInputValues(newValues);

    const Map: Record<number, string> = {
      0: "id",
      1: "pw",
      3: "nickname",
    };

    const alertMessage = validateForms(newValues[idx], Map[idx]);
    const newMsgs = [...errorMsgs];
    if (idx === 2 && inputValues[1] !== newValues[2]) {
      newMsgs[idx] = "비밀번호가 일치하지 않습니다.";
    } else {
      newMsgs[idx] = alertMessage;
    }
    setErrorMsgs(newMsgs);
  };

  return {
    inputValues,
    inputRefs,
    errorMsgs,
    throttling,
    setThrottling,
    handleInputChange,
  };
};
