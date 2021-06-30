module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|@react-native-picker|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFiles: [
    './src/__test__/jestSetup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'src/hooks/modules/**/*.tsx',
    '!src/hooks/index.tsx',
    'src/utils/*.ts',
  ],
};
