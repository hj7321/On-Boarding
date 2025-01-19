module.exports = {
  presets: [
    "@babel/preset-env", // ES6 이상을 처리
    "@babel/preset-typescript", // TypeScript 지원
    "@babel/preset-react", // React JSX 지원 (React 프로젝트인 경우)
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // async/await 등을 지원
  ],
};
