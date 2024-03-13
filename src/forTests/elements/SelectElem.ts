import type { Locator } from 'playwright'
import DataTestIdElem from "./DataTestIdElem";

export default class SelectElem extends DataTestIdElem {
  public async input(value: string): Promise<void> {
    const webElement: Locator = await this.findElementInIframe()
    await webElement.selectOption(value)
  }
}
