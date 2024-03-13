import { mergeTests } from '@playwright/test'
import FormatLog from '../utils/FormatLog'
import { logger } from './loggerFixture'
import { qwaSteps } from './stepsfixture'

export const qwaTest = mergeTests(qwaSteps, logger)

qwaTest.beforeEach(async ({ logger }, testInfo) => {
  const prefixLog = FormatLog.getPrefixTestLog(
    testInfo.workerIndex,
    testInfo.title
  )
  logger.info(`--- TEST STARTED ---`)
})

qwaTest.afterEach(async ({ steps, logger, page }, testInfo) => {
  const finishLog = `--- TEST FINISHED -`

  switch (testInfo.status) {
    case 'passed': {
      logger.info(`${finishLog} SUCCESS ---`)
      break
    }
    case 'failed': {
      logger.error(`${finishLog} FAILED!!! ---`)
      //await page.pause()
      break
    }
    default: {
      logger.error(`${finishLog} BROKEN!!! ---`)
      //await page.pause()
      break
    }
  }
})
