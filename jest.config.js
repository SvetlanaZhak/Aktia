module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/backend/$1"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.server.json'
    }
  }
};