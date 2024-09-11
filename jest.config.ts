import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript
  testEnvironment: 'jest-environment-jsdom', // For React components and browser-like tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file if needed
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest to handle TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore unnecessary paths
};

export default config;
