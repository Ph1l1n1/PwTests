import type { Page } from 'playwright'
import type { TestInfo } from '@playwright/test'
import Log from '../Log'

/**
 * @description Фабрика страниц POM с установленной _pwPage
 */
export default class PageFactory<T> {
  public _pwPage: Page
  public testInfo: TestInfo | null
  public _logger: Log

  constructor(_pwPage: Page, _logger: Log) {
    this._pwPage = _pwPage
    this.testInfo = null
    this._logger = _logger
  }

  public get<C extends { new (...args: any[]): T }>(
    pageClass: C,
    ...args: ConstructorParameters<C>
  ): T {
    return new pageClass(...args, this._pwPage, this._logger)
  }
}
