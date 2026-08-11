const nextJest = require('next/jest');

// Provides Next.js path aliases and environment variables to Jest
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  // We are testing an API, so we use the Node environment
  testEnvironment: 'node',
};

module.exports = createJestConfig(customJestConfig);