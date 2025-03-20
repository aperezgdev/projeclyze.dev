const common = ['--require-module ts-node/register']

const api = [
  ...common,
  'test/apps/api/features/**/*.feature',
  '--require test/apps/api/features/step_definitions/*.steps.ts',
].join(' ')

module.exports = {
  api,
}
