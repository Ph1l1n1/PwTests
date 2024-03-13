export default class FormatLog {
  /**
   * Формат записи префикса лога состоящий из номера worker и имени теста
   * @param testWorkerIndex
   * @param testTitle
   */
  public static getPrefixTestLog(
    testWorkerIndex: number | null | undefined | string,
    testTitle: string | null | undefined
  ): string {
    return `(${testWorkerIndex}) [${testTitle}]:`
  }
}
