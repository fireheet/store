/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@domain/(.*)$': '<rootDir>/src/core/domain/$1',
    '^@data/(.*)$': '<rootDir>/src/core/data/$1',
    '^@presentation/(.*)$': '<rootDir>/src/core/presentation/$1',
    '^@infra/(.*)$': '<rootDir>/src/core/infra/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
  },
};
