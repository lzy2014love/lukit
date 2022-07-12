module.exports = {
  extends: ['eslint-config-airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': [0, 120, 2, { ignoreUrls: true }],
    'import/extensions': ['error', 'always', { ts: 'never' }],
    'no-use-before-define': 'off',
    'max-classes-per-file': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: true }],
    'import/prefer-default-export': 'off',
    'no-debugger': 'error',
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' },
    ],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage in destructure as it compiles into a verbose helper.
    // TS now compiles assignment spread into Object.assign() calls so that
    // is allowed.
    'no-restricted-syntax': ['error', 'ObjectPattern > RestElement', 'AwaitExpression'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules'],
      },
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
}
