/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./src/core/shared/config/inversify.config.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/core/**/dtos/**/*.ts',
    '!src/core/**/config/**/*.ts',
    '!src/core/**/config/*.ts',
    '!src/core/**/constants/**/*.ts',
    '!src/core/**/constants/*.ts',
    '!src/core/**/domain/usecases/**/*.ts',
    '!src/core/**/data/models/**/*.ts',
    '!src/core/**/data/models/*.ts',
    '!src/core/**/enums/**/*.ts',
    '!src/core/**/types/**/*.ts',
    '!src/core/**/contracts/**/*.ts',
    '!src/main/server.ts',
    '!src/main/**/config/**/*.ts',
    '!src/main/**/config/*.ts',
    '!src/main/**/constants/**/*.ts',
    '!src/main/**/constants/*.ts',
    '!src/main/**/enums/**/*.ts',
    '!src/main/**/types/**/*.ts',
    '!src/main/routes/**/*.ts',
    '!src/main/routes/*.ts'
  ],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  coverageProvider: 'v8',
  testEnvironment: 'node',
  maxWorkers: '50%',
  testPathIgnorePatterns: [
    '/stryker-tmp/',
    '/node_modules/',
    '/requirements/',
    '/dist/'
  ],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/core/domain/$1',
    '^@data/(.*)$': '<rootDir>/src/core/data/$1',
    '^@presentation/(.*)$': '<rootDir>/src/core/presentation/$1',
    '^@infra/(.*)$': '<rootDir>/src/core/infra/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@constants/(.*)$': '<rootDir>/src/core/config/constants/$1',
    '^@config/(.*)$': '<rootDir>/src/core/config/$1'
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
