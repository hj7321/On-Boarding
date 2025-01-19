import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
