import { pageObjectModel } from '../../qwaFramework/core/decorators/pageObjectModel'
import QwaElement from '../../qwaFramework/core/baseObjects/QwaElement'
import DataTestIdElem from "../elements/DataTestIdElem";

@pageObjectModel
export default class WidgetHeader extends QwaElement {
  cart = new DataTestIdElem('Cart', `cart`)

  async isLoaded(): Promise<boolean> {
    return await this.cart.isVisible()
  }
}
