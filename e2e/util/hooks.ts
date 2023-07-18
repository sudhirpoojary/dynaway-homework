// noinspection JSUnusedGlobalSymbols

import { Capabilities, Options, Frameworks } from '@wdio/types'
import cucumberJson from 'wdio-cucumberjs-json-reporter'
import { cleanReportDirectory, generateHtmlReport } from './conf-functions'

export const hooks = {
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: () => {
    cleanReportDirectory()
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   */
  before: (capabilities: any, specs: any): void => {
    browser.fullscreenWindow()
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   */
  // beforeCommand: async () => {
  // },
  /**
   * Runs before a Cucumber feature
   */
  // beforeFeature: function (uri, feature) {
  // },
  /**
   * Runs before a Cucumber scenario
   */
  // beforeScenario: async () => {
  // },
  /**
   * Runs before a Cucumber step
   */
  // beforeStep: async () => {
  // },
  /**
   * Runs after a Cucumber step
   */
  // afterStep: async () => {
  // },
  /**
   * Runs after a Cucumber scenario
   */
  afterScenario: async (world: any, results: any) => {
    if (!results.passed) {
      const screenshot = await browser.takeScreenshot()
      cucumberJson.attach(screenshot, 'image/png')
    }
  },
  /**
   * Runs after a Cucumber feature
   */
  // afterFeature: function (uri, feature) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   */
  // after(): void {},
  /**
   * Gets executed right after terminating the webdriver session.
   */
  // afterSession(config: any, capabilities: any, specs: any): void {},
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   */
  onComplete: (
    exitCode: number,
    config: Options.Testrunner,
    capabilities: Capabilities.Capabilities,
    results: Frameworks.Results
  ) => {
    generateHtmlReport(results)
  },
  /**
   * Gets executed when a refresh happens.
   */
  // onReload: function(oldSessionId, newSessionId) {
  // }
}
