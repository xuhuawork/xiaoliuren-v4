import eslintPlugin from 'eslint-plugin-eslint-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['.next/**'], // 忽略 .next 文件夹
    languageOptions: {
      parser: typescriptParser, parserOptions: {
        ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: {
          jsx: true,
        }, project: './tsconfig.json', // 如果是 TS 项目
      },
    }, plugins: {
      '@typescript-eslint': typescriptPlugin,
      'eslint-comments': eslintPlugin, prettier: prettierPlugin,
    }, rules: {},
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}', '**/__tests__/**/*.{js,ts,jsx,tsx}'], rules: {
      'no-undef': 'off', // 测试环境中可能有全局变量
    },
  }];
