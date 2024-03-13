import type QwaPage from './page/QwaPage'
import type { Locator, Page } from 'playwright'
import Log from './Log'

export type QwaParent = QwaPage | QwaElement

/**
 * @description Класс служит для описания базовых действий с QwaElement
 * Наследовав функционал QwaElement можно создавать свои классы элементов со своими действиями,
 * присуще только конкретной группе элементов.
 * Пример "селектор": на ozon.ru для выбора категории из каталога,
 * в селекторе можно будет сосредоточить несколько мелких шагов, чтобы их не выносить на уровень бизнес логики теста.
 *
 * !!! Создавать свои элементы рекомендуется для частых и наиболее переиспользуемых элементов,
 * которые присутствуют на множестве страниц и имеют одинаковый паттерн поведения
 */
export default class QwaElement {
  qwaParent: QwaParent | undefined
  public _pwPage: Page | undefined | null = null
  public _logger: Log | undefined | null = null

  constructor(
    public name: string,
    public locator: string
  ) {}

  get pwPage(): Page {
    return this.getVariableFromQwaParent('pwPage')
  }

  get logger(): Log {
    return this.getVariableFromQwaParent('logger')
  }

  protected getVariableFromQwaParent<T>(name: string): T {
    const _name = `_${name}`
    if (this[_name] === null && this.qwaParent) {
      if (this.qwaParent instanceof QwaElement) {
        this[_name] = this.qwaParent[name]
      } else {
        this[_name] = this.qwaParent[_name]
      }
    }
    return this[_name]
  }

  protected async findElementInIframe(): Promise<Locator> {
    const page = this.pwPage
    const start = Date.now()
    const time = page['_timeoutSettings']['_parent']['_defaultTimeout']

    try {
      while (Date.now() - start < time) {
        for (const frame of page.frames()) {
          const el = frame.locator(this.locator).first()
          if (el && (await el.isVisible())) {
            return el
          }
        }
        await page.waitForTimeout(1000)
      }
      throw new Error(`Элемент не найден`)
    } catch (e) {
      throw new Error(
        `Элемент c локатором "${this.locator}" на странице "${this.qwaParent?.name}" не найден за время ${time}ms!`
      )
    }
  }

  public async getLocator(): Promise<Locator> {
    return await this.findElementInIframe()
  }

  public async click(): Promise<void> {
    const webElement: Locator = await this.findElementInIframe()
    await webElement.click()
  }

  public async getText(): Promise<string | null> {
    const webElement: Locator = await this.findElementInIframe()
    return await webElement.innerText()
  }

  public async input(value: string): Promise<void> {
    const webElement: Locator = await this.findElementInIframe()
    await webElement.fill('', { force: true, timeout: 100 })
    await webElement.fill(value, { force: true, timeout: 100 })
  }

  public async isVisible(): Promise<boolean> {
    try {
      const webElement: Locator = await this.findElementInIframe()
      await webElement.waitFor({ state: 'visible' })
      const isVisible = await webElement.isVisible()
      this.logger.debug(`QwaElement ${this.name}: isVisible:${isVisible}`)
      return isVisible
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
