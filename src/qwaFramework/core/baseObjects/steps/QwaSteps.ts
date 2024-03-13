import type QwaPage from '../page/QwaPage'

import { expect } from '@playwright/test'
import type { Locator } from 'playwright'
import Log from '../Log'
import { step } from '../../decorators/step'
import QwaElement from '../QwaElement'
import { getQwaParentNameForLog } from './getDataForLog'

type AnyAsyncFunction = (...args: any[]) => Promise<any>

export type StepUtils = {
  logger?: Log | null
  stepPrefix?: string
  testWorkerIndex?: number | null
  testTitle?: string | null
}

/**
 * @description Класс служит для описания базовых шагов
 * Наследовав функционал QwaSteps можно создавать свои классы с кастомными шагами
 * !!! Создавать свои шаги рекомендуется для частых и наиболее переиспользуемых шагов,
 * которые применимы на множестве страниц
 */
export default class QwaSteps {
  protected asyncFunctions: AnyAsyncFunction[] = []
  protected asyncConteinerFunctions: AnyAsyncFunction[] = []
  private expect = expect.configure({ timeout: 10_000 })

  public _utils: StepUtils = {
    logger: null,
    testWorkerIndex: null,
    testTitle: null,
  }

  constructor(logger: Log) {
    this._utils.logger = logger
    this._utils.stepPrefix = ''
  }

  /**
   * Page steps
   */
  // @ts-ignore
  @step('Переход по страницу: {0}')
  private async _goTo(name: string, page: QwaPage): Promise<void> {
    await page.goToPage(page)
    await page.pageLoaded(page)
  }

  public goTo(page: QwaPage): QwaSteps {
    this.asyncFunctions.push(async () => await this._goTo(page.name, page))
    return this
  }

  // @ts-ignore
  @step('Ожидание страницы: {0}')
  private async _waitForLoadPage(name: string, page: QwaPage): Promise<void> {
    //this._utils.logger?.info(`--URL:${await page._pwPage.url()}`)
    await page.isLoaded()
  }

  public waitForLoadPage(page: QwaPage): QwaSteps {
    this.asyncFunctions.push(async () => await this._waitForLoadPage(page.name, page))
    return this
  }

  /**
   * Element steps
   */
  // @ts-ignore
  @step('Клик на элемент: {0}')
  private async _click(name: string, element: QwaElement): Promise<void> {
    await element.click()
  }

  public click(element: QwaElement): QwaSteps {
    this.asyncFunctions.push(async () => await this._click(element.name, element))
    return this
  }

  // @ts-ignore
  @step('Ожидание элемента: {0}')
  private async _waitForLoad(name: string, element: QwaElement): Promise<void> {
    await element.isVisible()
  }

  public waitForLoad(element: QwaElement): QwaSteps {
    this.asyncFunctions.push(async () => await this._waitForLoad(element.name, element))
    return this
  }

  // @ts-ignore
  @step('Ожидание отсутствия элемента: {0}')
  private async _waitNotDispayed(name: string, element: QwaElement): Promise<void> {
    const locator = element._pwPage?.locator(element.locator) as Locator
    await locator.waitFor({ state: 'detached' })
  }

  public waitNotDispayed(element: QwaElement): QwaSteps {
    this.asyncFunctions.push(async () => await this._waitNotDispayed(element.name, element))
    return this
  }

  // @ts-ignore
  @step('Заполяется поле: {0} значением {1}')
  private async _fillField(name: string, value: string, element: QwaElement): Promise<void> {
    await element.input(value)
  }

  public fillField(element: QwaElement, value: string | number): QwaSteps {
    this.asyncFunctions.push(async () => await this._fillField(element.name, String(value), element))
    return this
  }

  /**
   * Check steps
   */
  // @ts-ignore
  @step('Проверка наличия элемента: {0} на странице: {1}')
  private async _checkElementIsVisible(name: string, qwaParentName: string, element: QwaElement): Promise<void> {
    expect(await element.isVisible(), '').toBe(true)
  }

  public checkElementIsVisible(element: QwaElement): QwaSteps {
    this.asyncFunctions.push(
      async () => await this._checkElementIsVisible(element.name, getQwaParentNameForLog(element), element)
    )
    return this
  }

  // @ts-ignore
  @step('Проверка наличия текста {2} у элемента: {0} на странице {1}')
  private async _checkTextFromElement(
    name: string,
    qwaParentName: string,
    expectedValue: string,
    element: QwaElement
  ): Promise<void> {
    await this.expect(await element.getLocator()).toHaveText(expectedValue)
  }

  public checkTextFromElement(element: QwaElement, value: string | number): QwaSteps {
    this.asyncFunctions.push(
      async () =>
        await this._checkTextFromElement(element.name, getQwaParentNameForLog(element), String(value), element)
    )
    return this
  }

  @step('Проверка наличия отправленного запроса по адресу: {0}')
  private async _checkRequestExist(url: RegExp | String, requestPostData: {}): Promise<void> {
    // code for expect
  }

  public checkRequestExist(url: RegExp | String, requestPostData: {}): QwaSteps {
    this.asyncFunctions.push(
      async () => await this._checkRequestExist(url, requestPostData)
    )
    return this
  }

  /**
   * Tech steps
   */
  // @ts-ignore
  @step('--- TEST PAUSE - NEED TO DELETE !!! --- ')
  private async _pause(name: string, page: QwaPage): Promise<void> {
    await page._pwPage.pause()
  }

  public pause(page: QwaPage): QwaSteps {
    this.asyncFunctions.push(async () => await this._pause(page.name, page))
    return this
  }

  // @ts-ignore
  @step(`Ожидание таймаута {0}`)
  private async _waitTimeout(name: string, page: QwaPage, timeout: number): Promise<void> {
    await page._pwPage.waitForTimeout(timeout)
  }

  public waitTimeout(page: QwaPage, timeout: number): QwaSteps {
    this.asyncFunctions.push(async () => await this._waitTimeout(page.name, page, timeout))
    return this
  }

  // todo rename to _
  public async run(): Promise<void> {
    for (const asyncFunc of this.asyncFunctions) {
      try {
        await asyncFunc()
      } catch (e) {
        throw e
      }
    }
    this.asyncFunctions = []
  }

  // todo rename to __
  public async runs(): Promise<void> {
    const asyncfunc = this.asyncConteinerFunctions[this.asyncConteinerFunctions.length - 1]
    try {
      await asyncfunc()
    } catch (e) {
      throw e
    }
  }

  // @ts-ignore
  @step('{0}')
  private async _createStep(stepName: string, asyncFunction: () => Promise<void>): Promise<void> {
    const spaces = '    '
    this._utils.stepPrefix += spaces
    await asyncFunction()
    this._utils.stepPrefix = this._utils.stepPrefix?.replace(spaces, '')
  }

  public createStep(stepName: string, asyncFunction: () => Promise<void>): QwaSteps {
    this.asyncConteinerFunctions.push(async () => await this._createStep(stepName, asyncFunction))
    return this
  }
}
