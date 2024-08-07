import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    clearMocks: true,
    collectCoverage: true,
    verbose: true,
};

export default config;
