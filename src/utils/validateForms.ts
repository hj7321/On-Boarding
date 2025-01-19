export const validateForms = (content: string, type: string): string => {
  switch (type) {
    case "id": {
      if (!content) return "아이디를 입력해주세요.";

      // 유효성 조건 1: 영어와 숫자로만 구성 여부
      const regex1 = /^[a-zA-Z0-9]+$/;
      if (!regex1.test(content))
        return "아이디는 영어와 숫자로만 구성해야 합니다.";

      // 유효성 조건 2: 길이 제한(5자 이상 12자 이하)
      if (content.length < 5 || content.length > 12)
        return "아이디는 5자 이상 12자 이하여야 합니다.";

      return "";
    }
    case "pw": {
      if (!content) return "비밀번호를 입력해주세요.";

      // 유효성 조건 1: 영어, 숫자, 특수문자 모두 포함 여부
      const regex2 =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]).+$/;
      if (!regex2.test(content))
        return "비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.";

      // 유효성 조건 2: 공백 문자 포함 여부
      if (/\s/.test(content))
        return "비밀번호는 공백 문자를 포함할 수 없습니다.";

      // 유효성 조건 3: 길이 제한(8자 이상 20자 이하)
      if (content.length < 8 || content.length > 20)
        return "비밀번호는 8자 이상 20자 이하여야 합니다.";

      return "";
    }
    case "nickname": {
      if (!content) return "닉네임을 입력해주세요.";

      // 유효성 조건 1: 내용 맨 처음과 끝에 공백 문자 포함 여부
      const regex3 = /^\s|\s$/;
      if (regex3.test(content))
        return "닉네임의 맨 앞과 끝에는 공백 문자가 올 수 없습니다.";

      // 유효성 조건 2: 길이 제한(2자 이상 7자 이하)
      if (content.length < 2 || content.length > 7)
        return "닉네임은 2자 이상 7자 이하여야 합니다.";

      return "";
    }
    default:
      return "";
  }
};
