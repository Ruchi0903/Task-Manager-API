export default {
  testEnvironment: 'node',
//   extensionsToTreatAsEsm: ['.js'],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  setupFiles: ['<rootDir>/tests/setupEnv.js'],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"], // run before tests
  testTimeout: 15000, // 15 seconds
};