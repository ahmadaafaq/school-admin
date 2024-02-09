/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

module.exports = {
  root: true,
  env: { browser: true, es2020: true },       // Specifies the environment where the code will run
  extends: [                                  // Include commonly used rules
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],    // Specifies files and directories to be ignored by ESLint
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],                   // Specifies the ESLint plugins to use
  rules: {
    // Disable no-unused-vars for a specific line
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',   // Ignore variables starting with underscore
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
