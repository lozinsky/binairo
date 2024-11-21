import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['.cache/', 'build/'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    extends: [js.configs.recommended, perfectionist.configs['recommended-natural']],
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    extends: [prettier],
    files: ['**/*.js'],
  },
  {
    extends: [
      ts.configs.strictTypeChecked,
      ts.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.strict,
      prettier,
    ],
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'side-effect',
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
);