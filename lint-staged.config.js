module.exports = {
  '*.+(js|jsx|json|css|less|scss|ts|tsx)': [
    `npm run prettier-format`,
    `npm run lint`,
    `npm run test`,
  ],
}
