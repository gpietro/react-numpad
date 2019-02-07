module.exports = {
  parser: 'babel-eslint',
  "plugins": [
    "react-hooks"
  ],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/standard'],
  parserOptions: {
    ecmaVersion: 8,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "react-hooks/rules-of-hooks": "error"
  },
};
