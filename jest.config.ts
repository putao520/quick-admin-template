import {type JestConfigWithTsJest, pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from "./tsconfig.json";

// console.log(pathsToModuleNameMapper(compilerOptions.paths));

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.mjs?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(@t3-oss/env-nextjs)/)'],
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}

export default jestConfig;
