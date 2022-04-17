import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest', // Helps jest understand typescript
  testEnvironment: 'node', 
  setupFilesAfterEnv: [ // Tell jest to run some files after everything have finished setting up
    "./src/test/setup.ts"
  ]
};

export default config;
