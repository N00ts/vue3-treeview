module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleDirectories: [
      'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '\\.(js|ts|jsx|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/dev.js",
    "!src/dev.vue",
    "!src/index.ts",
    "!src/structure/**",
    "!src/shims-vue.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["json", "lcov", "text", 'html'],
}