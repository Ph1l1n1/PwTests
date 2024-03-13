import QwaElement from '../../qwaFramework/core/baseObjects/QwaElement'

export default class DataTestIdElem extends QwaElement {
  public locator: string

  constructor(name: string, dataTestid: string) {
    const locator = `//*[@data-testid="${dataTestid}"]`
    super(name, locator)
    this.locator = locator
  }

  error = new QwaElement('Error', `/../..${this.locator}`)
}
