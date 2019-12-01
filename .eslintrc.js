module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings'],
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  plugins: ['react', 'react-hooks', 'mocha', 'import', 'jest'],
  globals: {
    expect: true,
    browser: true,
    test: true,
    describe: true,
    it: true,
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['src/*.js', 'conf/*.js'],
      excludedFiles: 'dist',
    },
  ],
  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'react/no-render-return-value': 0, // Needed for isomorphic part
    'import/no-extraneous-dependencies': 0, // Doesn't work on webpack 2 with alias : https://github.com/benmosher/eslint-plugin-import/issues/496
    'import/no-unresolved': 0, // Doesn't work on webpack 2 with alias : https://github.com/benmosher/eslint-plugin-import/issues/496
    'import/first': 0, // Doesn't work on webpack 2 with alias : https://github.com/benmosher/eslint-plugin-import/issues/496
    'import/extensions': [2, { js: 'never' }],
    'no-console': process.env.NODE_ENV === 'production' ? [2, { allow: ['warn', 'error'] }] : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-return-assign': [2, 'except-parens'],
    'global-require': 0,
    'no-confusing-arrow': 0,
    'jsx-a11y/no-static-element-interactions': [
      0,
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'no-noninteractive-element-to-interactive-role': [0],
    'jsx-a11y/interactive-supports-focus': [
      0,
      {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      0,
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'max-len': [2, 140, 4, { ignoreUrls: true }],
    'react-hooks/rules-of-hooks': 'error', // Vérifie les règles des Hooks
    'react-hooks/exhaustive-deps': 'warn', // Vérifie les tableaux de dépendances
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['src', './src'], ['stub', './test/stub'], ['storybook', './storybook']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
