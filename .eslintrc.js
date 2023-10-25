module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prefer-template': 'error',
    'import/order': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
