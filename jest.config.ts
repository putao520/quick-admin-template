import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

// console.log(pathsToModuleNameMapper(compilerOptions.paths));

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx|mjs|js)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@t3-oss/env-nextjs|@t3-oss/env-core|superjson|@auth/prisma-adapter)/)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/tests/'],
}

export default jestConfig
