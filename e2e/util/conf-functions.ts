/**
 * A file where functions used in configuration files are kept
 */
import { execSync } from 'child_process'
import { Frameworks } from '@wdio/types'
import { Options, generate } from 'cucumber-html-reporter'

const fs = require('fs')
const path = require('path')

const testReportDir = './test-reports/e2e'

/**
 * Stupid Windows machines don't understand the asterisk so let's use this ugly
 * work around to get a list of all the steps files in the steps folder
 *
 * Example output:
 * [
 *    'C:\\Users\\joskr\\WebstormProjects\\EAM-Mobile-Ionic\\e2e\\steps\\authentication.steps.ts',
 *    'C:\\Users\\joskr\\WebstormProjects\\EAM-Mobile-Ionic\\e2e\\steps\\left-menu.steps.ts',
 *    ...
 * ]
 */
export const getAllStepFilesPaths = () => {
  const steps: string[] = []

  fs.readdirSync(path.join(__dirname, '../steps')).forEach((file: string) => {
    steps.push(path.join(__dirname, `../steps/${file}`))
  })

  return steps
}

export const cleanReportDirectory = () => {
  const testReportDir2 = './test-reports/e2e-junit'

  // create parent folder with test reports if it doesn't exist yet
  if (!fs.existsSync('./test-reports')) fs.mkdirSync('./test-reports')

  // create child folder with test reports if it doesn't exist yet
  if (!fs.existsSync(testReportDir)) fs.mkdirSync(testReportDir)
  if (!fs.existsSync(testReportDir2)) fs.mkdirSync(testReportDir2)

  // clean up test reports folder from json files generated in the previous run
  fs.readdirSync(testReportDir).forEach((file: string) => {
    if (file.match(/.*.json/gm)) fs.unlinkSync(`./test-reports/e2e/${file}`)
  })
  fs.readdirSync(testReportDir2).forEach((file: string) => {
    if (file.match(/.*.xml/gm)) fs.unlinkSync(`./test-reports/e2e-junit/${file}`)
  })
}

export const generateHtmlReport = (results: Frameworks.Results) => {
  if (!results.passed && !results.failed) return

  const options: Options = {
    theme: 'bootstrap',
    jsonDir: testReportDir,
    output: path.join(testReportDir, 'report.html'),
    launchReport: false,
    reportSuiteAsScenarios: true,
    name: 'Dynaway Mobile EAM',
    brandTitle: 'E2E test report',
  }

  generate(options)
}

export const getJiraIssueID = (): string | undefined => {
  let jiraIssueID = process.env.BITBUCKET_BRANCH?.match(/DMO-\d+/)?.[0]

  if (!jiraIssueID) {
    try {
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString()
      jiraIssueID = branchName.match(/DMO-\d+/)?.[0]

      if (!jiraIssueID) jiraIssueID = branchName
    } catch (e) {
      console.log('Failed to get git branch name', e)
    }
  }

  return jiraIssueID
}
