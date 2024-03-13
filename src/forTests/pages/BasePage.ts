import QwaPage from '../../qwaFramework/core/baseObjects/page/QwaPage'
import WidgetHeader from "../widgets/WidgetHeader";

export default class BasePage extends QwaPage{
  widgetHeader = new WidgetHeader('WidgetHeader', '//*[@id="main-header"]')
  // другие базовые компоненты, например: футер, чат
}
