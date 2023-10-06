module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  globals: {},

  extends: [
    'next/core-web-vitals',
    'plugin:storybook/recommended',
    'eslint:recommended',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },

  plugins: ['react', '@typescript-eslint'],

  settings: {
    'import/extensions': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/ignore': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
      },
      typescript: {
        project: './tsconfig.eslint.json',
      },
    },
  },

  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'strict',
        endOfLine: 'lf',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'react/self-closing-comp': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'object-shorthand': 'error',
    'no-console': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};
