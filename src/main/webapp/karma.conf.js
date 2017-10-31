/* eslint-env node */

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: './',

    files: [
      // main.js will handle finding and loading the tests,
      // by way of RequireJS.
      'test/main.js',
      '../../node_modules/karma-read-json/karma-read-json.js',
      // all other files need to be listed in order to be hosted and
      // available, but excluded so that they are not run automatically.
      {pattern: './**', included: false},
    ],

    preprocessors: {
      'portal/**/*.js': 'coverage',
      'my-app/**/*.js': 'coverage',
    },

    autoWatch: true,

    frameworks: ['jasmine', 'requirejs'],

    browsers: ['ChromeHeadless'], // or 'Chrome'

    plugins: [
      'karma-htmlfile-reporter',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-requirejs',
      'karma-coverage',
      'karma-coveralls',
    ],

    reporters: ['dots', 'html', 'coverage', 'coveralls'],

    htmlReporter: {
      outputFile: 'test_out/units.html',
    },

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit',
    },

    coverageReporter: {
      // lcov or lcovonly are required for generating lcov.info files
      type: 'lcov',
      dir: 'coverage/',
    },

    colors: true,
  });
};
