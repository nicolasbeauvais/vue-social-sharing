module.exports = {
  root: true,
  'env': {
    'jest/globals': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  extends: [
    'vue'
  ],
  plugins: [
    'vue',
    'jest'
  ],
  rules: {
    camelcase: 'off'
  }
}
