import { pageObjectModel } from '../../qwaFramework/core/decorators/pageObjectModel'
import DataTestIdElem from "../elements/SelectElem";
import SelectElem from "../elements/SelectElem";

@pageObjectModel
export default class WidgetDate extends DataTestIdElem {
  dateMonth = new SelectElem('DateMonth', `dateMonth`)
  dateDay = new SelectElem('DateDay', `dateDay`)
  dateYear = new SelectElem('DateYear', `dateYear`)

  async isLoaded(): Promise<boolean> {
    return await this.dateMonth.isVisible()
  }
}
