import { test as base } from '@playwright/test'
import FormatLog from '../utils/FormatLog'
import Log from '../baseObjects/Log'

export type LoggerFixture = {
  logger: Log
}

/**
 * @description Фикстура для инициализации логера шагов
 */
export const logger = base.extend<LoggerFixture>({
  logger: async ({}, use, testInfo) => {
    const logPrefix = `${FormatLog.getPrefixTestLog(testInfo.workerIndex, testInfo.title)}`
    await use(new Log('CORE', logPrefix))
  },
})
