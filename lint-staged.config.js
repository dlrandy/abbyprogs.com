module.exports = {
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx|vue)': [
    `npm run prettier-format`,
    `npm run lint`,
    `npm run test --findRelatedTests`,
  ],
}