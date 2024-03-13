import type { Page } from 'playwright'
import type { TestInfo } from '@playwright/test'
import Log from '../Log'

/**
 * @description Класс служит для описания базовых действий со страницей
 * Наследовав функционал QwaPage можно создавать свои классы страниц.
 * Например: Ваше приложение обладает элементами которые встречаются в разных частях
 * приложения: алерты, хедер, футер и т.п.
 */
export default class QwaPage {
  public url: string
  public name: string
  public _pwPage: Page
  public testInfo: TestInfo | undefined
  public _logger: Log

  constructor(name: string, url: string, page: Page, _logger: Log) {
    this.name = name
    this.url = url
    this._pwPage = page
    this._logger = _logger
  }

  public async goToPage(page: QwaPage): Promise<any> {
    this._logger.debug('goToPage')
    await this._pwPage.goto(page.url)
  }

  public async pageLoaded(page: QwaPage): Promise<any> {
    this._logger.debug('pageLoaded')
    try {
      await page.isLoaded()
    } catch (e) {
      throw new Error(
        `Не удалось дождаться загрузки страницы "${page.name}"\n${e}`
      )
    }
  }

  public async isLoaded(): Promise<boolean> {
    return true
  }
}
