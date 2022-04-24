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
  ignorePatterns: ['dist', 'node_modules', 'src/core/meal', 'src/core/store'],
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  allowConsoleColors: true,
  mutator: {
    excludedMutations: ['']
  },
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.js'
  }
};
