const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
}

module.exports = createJestConfig(customJestConfig)