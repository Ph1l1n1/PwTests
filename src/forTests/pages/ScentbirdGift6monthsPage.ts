import { pageObjectModel } from '../../qwaFramework/core/decorators/pageObjectModel'
import QwaElement from '../../qwaFramework/core/baseObjects/QwaElement'
import DataTestIdElem from '../elements/DataTestIdElem'
import BasePage from './BasePage'
import WidgetDate from "../widgets/WidgetDate";

@pageObjectModel
export default class ScentbirdGift6monthsPage extends BasePage {
  backgroundImage = new QwaElement('BackgroundImage', `//figure`)
  cologne = new DataTestIdElem(
    'Cologne',
    `recipientGenderOptionMale`
  )
  perfume = new DataTestIdElem(
    'Perfume',
    `recipientGenderOptionFemale`
  )
  recipientName = new DataTestIdElem('RecipientName', `recipientName`)
  recipientEmail = new DataTestIdElem('RecipientEmail', `recipientEmail`)
  recipientMessage = new DataTestIdElem('RecipientMessage', `recipientMessage`)
  senderName = new DataTestIdElem('SenderName', `senderName`)
  sendDateOptionNow = new DataTestIdElem(
    'SendDateOptionNow',
    `sendDateOptionNow`
  )
  sendDateOptionLater = new DataTestIdElem(
    'SendDateOptionLater',
    `sendDateOptionLater`
  )
  payForYourOrder = new DataTestIdElem(
    'PayForYourOrder',
    `checkoutNowButton`
  )

  widgetDate = new WidgetDate('WidgetDate', 'date')

  async isLoaded(): Promise<boolean> {
    return (
      (await this.backgroundImage.isVisible()) &&
      (await this.widgetHeader.cart.isVisible())
    )
  }
}
