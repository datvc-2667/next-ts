import nextJest from 'next/jest';
import { Config } from '@jest/types';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFiles: ['<rootDir>/src/setEnvVars.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/templates/**/*.{ts,tsx,js,jsx}',
    'src/pages/**/*.{ts,tsx,js,jsx}',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
    // '!**/*.d.ts',
    // '!**/node_modules/**',
    // '!<rootDir>/.next/**',
    // '!<rootDir>/out/**',
    // '!<rootDir>/coverage/**',
    // '!<rootDir>/*.config.js',
    // '!src/**/*.stories.{ts,tsx,js,jsx}',
    // '!src/**/*.d.ts',
    // '!src/typings/*',
    // '!src/constants/*',
  ],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svg.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const asyncConfig = createJestConfig(customJestConfig);
module.exports = async () => {
  const config: Config.InitialOptions = await asyncConfig();
  config.transformIgnorePatterns = ['"node_modules/(?!wagmi)/"'];
  return config;
};
