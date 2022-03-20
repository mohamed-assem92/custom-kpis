module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: [
    '**/*.spec.[jt]s',
  ],
  reporters: ['default'],
  setupFilesAfterEnv: ['jest-extended'],
};
