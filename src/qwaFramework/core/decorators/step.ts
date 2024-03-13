import QwaElement from '../baseObjects/QwaElement'
import { qwaTest } from '../fixtures/qwaTestFixture'
import QwaSteps from '../baseObjects/steps/QwaSteps'
import QwaPage from '../baseObjects/page/QwaPage'

/**
 * @description Декоратор для всех шагов:
 *    1 Логирования действий в отчет
 *    2 Логирования действий в консоль
 *
 * @example: @step('Клик на элемент: {0}')
 *           private async _click(name: string, element: QwaElement): Promise<void> {
 *           await element.click();
 *           }
 */
export function step<This, Args extends unknown[], Return>(stepLabel: string) {
  return function stepWithDescription(
    targetMethod: (this: This, ...args: Args) => Return
  ) {
    async function stepDecoredMethod(
      this: This,
      ...args: Args
    ): Promise<unknown> {
      let stepName = getFormatedStepName(stepLabel, ...args)

      const isQwaElement = args[1] instanceof QwaElement
      const qwaParentName: string = getQwaParentName(args)
      const postfix = ` на странице "${qwaParentName}"`
      stepName += isQwaElement ? postfix : ''

      log(this, stepName, 'info')
      return await qwaTest.step(stepName, async () => {
        return targetMethod.call(this, ...args)
      })
    }

    return stepDecoredMethod
  }
}

/**
 * Замена переменных {0},{1} и т.п. на значения которые будут использоваться в названии щагов
 */
function getFormatedStepName(template: string, ...args: any[]): string {
  return template.replace(/\{(\d+)\}/g, (match, index) => `"${args[index]}"`)
}

/**
 * Логирование шага в консоле
 * @param thisContext контект QwaSteps
 * @param text - текст лога (имя шага или тексти ошибки)
 * @param logLevel - уровень логирования
 */
function log(thisContext: any, text: string, logLevel: string) {
  let stepPrefix =
    thisContext instanceof QwaSteps && thisContext._utils.stepPrefix !== null
      ? thisContext._utils.stepPrefix
      : ''

  const stepLog = `${stepPrefix}${text}`

  if (thisContext instanceof QwaSteps && thisContext._utils.logger)
    thisContext._utils.logger[logLevel](stepLog)
}

function getQwaParentName(args: any): string {
  const qwaParentName =
    args[1] instanceof QwaPage
      ? args[1].name
      : args[1] instanceof QwaElement
        ? args[1].qwaParent?.name
        : ''
  return String(qwaParentName)
}
