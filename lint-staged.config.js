module.exports = {
  '*.+(js|jsx|json|css|less|scss|ts|tsx)': [
    'yarn run prettier-format',
    'yarn run lint',
    'yarn run test',
  ],
}
