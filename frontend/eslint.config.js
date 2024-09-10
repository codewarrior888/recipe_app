const react = require('eslint-plugin-react');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      prettier,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'prettier/prettier': 'error',
      semi: ['warn', 'always'],
    },
  },
];
