module.exports = {
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