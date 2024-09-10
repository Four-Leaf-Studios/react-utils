module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Correct environment for testing React components
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Custom setup for Jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel to transform JS/TS files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist for tests
};
