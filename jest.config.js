module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
};
