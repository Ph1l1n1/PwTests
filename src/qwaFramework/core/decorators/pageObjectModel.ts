import QwaElement from '../baseObjects/QwaElement'
import QwaPage from '../baseObjects/page/QwaPage'

/**
 * @description Декоратор служит для наделения сущностью qwaParent каждого элемента
 * Позволяет сделать страницы с стиле POM
 *
 * @dev страница(page, ...) <- элемент <- элемент <- элемент
 * Экземпляр pwPage хранится в странице, доступ у элемента есть до этой переменной через обращение к this.pwPage,
 * который возвращает pwPage от своего родителя через qwaParent
 *
 * @param Class в котором содержатся элементы QwaElement
 * @example:
 *      @pageObjectModel
 *      export default class WidgetOzonAuth extends QwaElement {
 *             button = new QwaElement('Кнопка', '//button[@data-qa="button"]');
 *      }
 */
export function pageObjectModel<T extends { new (...args: any[]): {} }>(
  Class: T
) {
  return class extends Class {
    constructor(...args: any[]) {
      super(...args)

      Object.keys(this).forEach((key) => {
        const elementInstance = this[key]
        if (elementInstance instanceof QwaElement) {
          if (this instanceof QwaElement || this instanceof QwaPage) {
            elementInstance.qwaParent = this
          }
        }
      })
    }
  }
}
