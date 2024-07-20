module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/mocks/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    "html",
    "text"
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  // ... other options ...
}