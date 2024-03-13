import { test } from '../src/forTests/fixtures/testFixture'

let requestPostData = {
  variables: {
    input: {
      giftSubscriptionItem: {
        months: 6,
        offer: null,
        recipient: {},
      },
    },
  },
}

test.describe.parallel('Page-Gift6Months-Positive', () => {
  test.beforeEach(async ({ pages, steps }) => {
    await steps.goTo(pages.scentbirdGift6monthsPage).run()
  })

  test.only('Pay for your order - Cologne - Send right now', async ({ steps, pages }): Promise<void> => {
    const formData = {
      email: 'testName1@gmail.com',
      gender: 'MALE',
      message: 'test message',
      name: 'testName1',
    }
    requestPostData.variables.input.giftSubscriptionItem.recipient = formData

    await steps
      .createStep('Filling the form', async () => {
        await steps
          .click(pages.scentbirdGift6monthsPage.cologne)
          .fillField(pages.scentbirdGift6monthsPage.recipientName, formData.name)
          .fillField(pages.scentbirdGift6monthsPage.recipientEmail, formData.email)
          .fillField(pages.scentbirdGift6monthsPage.recipientMessage, formData.message)
          .run()
      })
      .pause(pages.scentbirdGift6monthsPage)
      .click(pages.scentbirdGift6monthsPage.payForYourOrder)
      // Я не могу реализовать и протестировать этап проверки отправленного запроса, потому что scentbird блокирует работу, так как думает, что я робот
      // .checkRequestExist(/graphql\?opname=CartModify/, requestPostData)
      .runs()
    console.log()
  })

  test('Pay for your order - Perfume - Choose a later date to send', async ({ steps, pages }): Promise<void> => {
    // similar to the previous test
    // const formData = {}
    // requestPostData.variables.input.giftSubscriptionItem.recipient = formData

    await steps
      .createStep('Filling the form', async () => {
        await steps
          .click(pages.scentbirdGift6monthsPage.perfume)
          .fillField(pages.scentbirdGift6monthsPage.recipientName, 'testName1')
          .fillField(pages.scentbirdGift6monthsPage.recipientEmail, 'testName1@gmail.com')
          .fillField(pages.scentbirdGift6monthsPage.recipientMessage, 'test message')
          .run()
      })
      .click(pages.scentbirdGift6monthsPage.sendDateOptionLater)
      .createStep('Filling the date', async () => {
        await steps
          .fillField(pages.scentbirdGift6monthsPage.widgetDate.dateMonth, 4)
          .fillField(pages.scentbirdGift6monthsPage.widgetDate.dateDay, 15)
          .fillField(pages.scentbirdGift6monthsPage.widgetDate.dateYear, 2024)
          .run()
      })
      .click(pages.scentbirdGift6monthsPage.payForYourOrder)
      .checkTextFromElement(pages.scentbirdGift6monthsPage.payForYourOrder, 'Loading...')
        // Я не могу реализовать и протестировать этап проверки отправленного запроса, потому что scentbird блокирует работу, так как думает, что я робот
      // .checkRequestExist(/graphql\?opname=CartModify/, requestPostData)
      .runs()
  })
})