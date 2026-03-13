module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.native.ts', '.native.tsx', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@styles': './app/_styles',
          '@customs': './customs',
          '@environments': './environments',
          '@images': './assets/images',
          '@boot': './boot',
        },
      },
    ],
  ],
};

