import { test as base } from '@playwright/test'
import QwaSteps from '../baseObjects/steps/QwaSteps'
import Log from '../baseObjects/Log'
import FormatLog from '../utils/FormatLog'

export type QwaStepsFixture = {
  steps: QwaSteps
  loggerStep: Log
}

/**
 * @description Фикстура для инициализации базовых шагов
 */
export const qwaSteps = base.extend<QwaStepsFixture>({
  loggerStep: async ({}, use, testInfo) => {
    const logPrefix = `${FormatLog.getPrefixTestLog(testInfo.workerIndex, testInfo.title)}`
    await use(new Log('STEP', logPrefix))
  },
  steps: async ({ loggerStep }, use) => {
    loggerStep.debug('QwaStepsFixture initialization')
    await use(new QwaSteps(loggerStep))
  },
})

qwaSteps.beforeEach(async ({ steps }, testInfo) => {
  steps._utils.testTitle = testInfo.title
  steps._utils.testWorkerIndex = testInfo.workerIndex
})
