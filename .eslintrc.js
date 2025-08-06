module.exports = {
  root: true,
  extends: ['@react-native', '@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Performance rules
    'react/jsx-no-bind': ['warn', {
      allowArrowFunctions: true,
      allowBind: false,
      ignoreRefs: true,
    }],
    
    // Code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // React Native specific
    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
  },
};
