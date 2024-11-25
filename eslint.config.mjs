import eslintPlugin from 'eslint-plugin-eslint-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [{
  // 应用的文件匹配规则
  files: ['**/*.{js,jsx,ts,tsx}'],

  // 解析器
  languageOptions: {
    parser: typescriptParser, parserOptions: {
      ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: {
        jsx: true,
      }, project: './tsconfig.json', // 如果是 TS 项目
    },
  },

  // 插件
  plugins: {
    '@typescript-eslint': typescriptPlugin, 'eslint-comments': eslintPlugin, prettier: prettierPlugin,
  },

  // 继承的规则集
  extends: ['eslint:recommended', // 推荐的基本规则
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'plugin:eslint-comments/recommended', // eslint-comments 推荐规则
    'plugin:prettier/recommended', // 集成 Prettier
    'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  // 自定义规则
  rules: {
    // 基本规则
    'no-unused-vars': 'off', // 关闭默认规则
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 使用 TS 的规则
    'no-console': 'warn', // 警告未删除的 console.log

    // Prettier 规则
    'prettier/prettier': 'error',

    // eslint-comments 规则
    'eslint-comments/no-unused-disable': 'error',
  },
}, {
  // 针对测试文件的特定配置
  files: ['**/*.test.{js,ts,jsx,tsx}', '**/__tests__/**/*.{js,ts,jsx,tsx}'], rules: {
    'no-undef': 'off', // 测试环境中可能有全局变量
  },
}];
