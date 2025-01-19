import "@testing-library/jest-dom";

// Jest에서 import.meta를 mock 처리
global.importMeta = {
  env: {
    VITE_TOKEN_EXPIRES_IN: "3600", // 테스트용 환경 변수 값
  },
};
