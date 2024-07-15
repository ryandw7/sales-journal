module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
      coverageDirectory: "coverage",
      coverageReporters: [
        "html",
        "text"
      ]
       // ... other options ...
     }