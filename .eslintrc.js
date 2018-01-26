module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 8,
  },
  env: {
    browser: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',      
        printWidth: 100,  
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
