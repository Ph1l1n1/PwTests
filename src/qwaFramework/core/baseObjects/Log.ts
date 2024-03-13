import pino, { Logger } from 'pino'

export default class Log {
  public log: Logger

  /**
   * Инициализация логера
   *
   * @param logName - имя логера
   * @param logPrefix - префикс логера
   * @exampleInConsole: INFO: (0) [test 1]:  STEP: "Открытие формы авторизации"
   * Из чего состоит лог:
   *    "INFO" - уровень логирования, его можно задать через env QWA_LOG_<logName>, по-дефолту: info
   *    "(0) [test 1]:  STEP:" - префикс, задается при создании экземпляра логера
   *    "Открытие формы авторизации" - сообщение логера
   *
   * @exampleInCode:
   *    const logPrefix = `${FormatLog.getPrefixTestLog(testInfo.workerIndex, testInfo.title)}`;
   *    new Log(`STEP`, `(${testInfo.workerIndex}) [${testInfo.title}]:`);
   *
   *
   * @logerNames:
   *    QWA_LOG - самый высокий приоритет, может выставить уровень для всех логов
   *    QWA_LOG_STEP - логирование шагов
   *    QWA_LOG_PAGE_OBJECT - логирование для объектов pageObjectModel
   */
  constructor(logName: string, logPrefix?: string) {
    const qwaObjectLogName: string = `QWA_LOG_${logName}`
    const msgPrefix = logPrefix ? `${logPrefix} ` : ``
    this.log = pino({
      base: null,
      name: qwaObjectLogName,
      msgPrefix: `${msgPrefix} ${logName}: `,
      level: process.env.QWA_LOG
        ? process.env.QWA_LOG
        : process.env[qwaObjectLogName]
          ? process.env[qwaObjectLogName]
          : 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: true,
          colorize: true,
        },
      },
    })
  }

  info(message: string): void {
    this.log.info(message)
  }

  debug(message: string): void {
    this.log.debug(message)
  }

  error(message: string | unknown): void {
    this.log.error(`\x1b[31m${message}\x1b[0m`)
  }
}

export enum EType {
  AXIOS = '--- ERROR:AXIOS:\n',
  TEST = '--- ERROR:TEST:\n',
}
