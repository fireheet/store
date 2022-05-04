/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information",
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  tempDirName: 'stryker-tmp',
  mutate: [
    'src/core/**/*.ts',
    '!src/**/config/**/*.ts',
    '!src/**/dtos/**/*.ts',
    '!src/**/types/**/*.ts',
    '!src/**/sources/**/*.ts',
    '!src/**/models/**/*.ts',
    '!src/**/contracts/**/*.ts',
    '!src/**/views/**/*.ts',
    '!src/**/__tests__/*.spec.ts',
  ],
  ignorePatterns: [
    'dist', 
    'node_modules',
    'src/core/meal', 
    'src/core/store'],
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  allowConsoleColors: true,
  jest: {
    projectType: 'custom',
    configFile: 'jest.stryker.config.js'
  }
};
