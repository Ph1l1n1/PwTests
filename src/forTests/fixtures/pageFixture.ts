import ScentbirdGift6monthsPage from '../pages/ScentbirdGift6monthsPage'
import FormatLog from '../../qwaFramework/core/utils/FormatLog'
import { qwaTest } from '../../qwaFramework/core/fixtures/qwaTestFixture'
import PageFactory from '../../qwaFramework/core/baseObjects/page/PageFactory'
import Log from '../../qwaFramework/core/baseObjects/Log'

export interface IPages {
  scentbirdGift6monthsPage: ScentbirdGift6monthsPage
}

export type PagesFixture = {
  pages: IPages
}

/**
 * @description Фикстура для инициализации страниц по POM
 */
export const pagesFixture = qwaTest.extend<PagesFixture>({
  pages: async ({ page, logger }, use, testInfo) => {
    logger.debug(`PagesFixture initialization`)
    const logPrefix = `${FormatLog.getPrefixTestLog(testInfo.workerIndex, testInfo.title)}`
    const pageFactory = new PageFactory(page, new Log('PAGE_OBJECT', logPrefix))

    // @ts-ignore
    const scentbirdGift6monthsPage: ScentbirdGift6monthsPage = pageFactory.get(
      ScentbirdGift6monthsPage,
      // @ts-ignore
      'ScentbirdGift6monthsPage',
      'https://www.scentbird.com/gift?months=6'
    )

    await use({ scentbirdGift6monthsPage })
  },
})

pagesFixture.beforeEach(async ({ pages }, testInfo) => {
  // todo назначить browser в каждый элемент
  Object.keys(pages).forEach((page) => {
    // @ts-ignore
    pages[page]['testInfo'] = testInfo
  })
})
