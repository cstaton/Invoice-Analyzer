// Karma configuration
// Generated on Tue Oct 06 2015 11:21:42 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'client/lib/angular/angular.js',
        'client/lib/angular-ui-router/release/angular-ui-router.js',
        'client/lib/angular-mocks/angular-mocks.js',
        'client/app/app.js',
        'client/app/**/*.module.js',
        'client/app/templates/templates.js',
        'tests/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    nyanReporter: {
      // suppress the error report at the end of the test run
      suppressErrorReport: false,

      // suppress the red background on errors in the error
      // report at the end of the test run
      suppressErrorHighlighting: true,
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],

    plugins: [
        'karma-jasmine',
        'karma-nyan-reporter',
        'karma-chrome-launcher',
        'karma-phantomjs2-launcher'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
