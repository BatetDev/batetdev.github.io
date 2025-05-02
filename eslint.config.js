import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroEslint from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroEslint,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
      globals: {
        astro: true,
        URL: true,
      },
    },
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  {
    ignores: ['dist/**/*', 'node_modules/**/*', '.astro/**/*'],
  },
];
