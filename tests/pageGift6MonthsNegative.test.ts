import { test } from '../src/forTests/fixtures/testFixture'

test.describe.parallel('Page-Gift6Months-Negative', () => {
  test.beforeEach(async ({ pages, steps }) => {
    await steps.goTo(pages.scentbirdGift6monthsPage).run()
  })

  test('Check validation error for empty form', async ({ steps, pages }): Promise<void> => {
    await steps
      .click(pages.scentbirdGift6monthsPage.payForYourOrder)
      .checkTextFromElement(pages.scentbirdGift6monthsPage.recipientName.error, 'Required')
      .checkTextFromElement(pages.scentbirdGift6monthsPage.recipientEmail.error, 'Required')
      .runs()
  })

  test('Check validation error for wrong typed recipientEmail', async ({ steps, pages }): Promise<void> => {
    await steps
      .fillField(pages.scentbirdGift6monthsPage.recipientEmail.error, 'test@ssss')
      .checkTextFromElement(pages.scentbirdGift6monthsPage.recipientEmail.error, 'Valid email address required')
      .runs()
  })
})
