/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["jest-extended/all"],
  testMatch: ["<rootDir>/src/after/**/*.test.ts"],
};
