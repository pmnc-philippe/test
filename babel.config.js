module.exports = {
  // jest: https://github.com/facebook/jest/issues/7359
  babelrcRoots: ['.', 'packages/*'],

  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          // WARNING : This data is also defined in `.browserlistrc` for compatibility reasons
          // Please update both places if needed
          browsers: [
            // browserlist file => https://github.com/babel/babel-preset-env/pull/161
            // desktops
            'last 2 versions',
            'IE >= 11',
          ],
        },
        debug: false, // set it to true to gate debug info printed into console
      },
    ],
  ],
  plugins: [
    'add-filehash', // Needed for HMR force update when typing small changes (space, \n)
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    // keep it before class-properties decoratorsBeforeExport: true, legacy: false
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    'lodash',
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    [
      'module-resolver', // In order to resolve aliases when running Jest
      {
        alias: {
          src: './src',
          storybook: './storybook',
          stubs: './test/stub',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        // "dynamic-import-node",
        'babel-plugin-require-context-hook',
        'dynamic-import-node-babel-7',
      ],
    },
    production: {
      // presets: ['babel-preset-react-optimize'],
      // "useBuiltins": true
    },
  },
};
