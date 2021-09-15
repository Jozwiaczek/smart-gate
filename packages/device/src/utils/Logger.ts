import chalk, { ForegroundColor } from 'chalk';

import { LoggerContext } from '../enums/loggerContext.enum';

class Logger {
  constructor(private context: LoggerContext) {}

  static getTimestamp(): string {
    const currentDate = new Date();
    const dateOpt = 'pl-PL';
    const date = currentDate.toLocaleDateString(dateOpt);
    const time = currentDate.toLocaleTimeString(dateOpt);
    return `${date}, ${time}`;
  }

  private composeMessage(
    message: any,
    primaryColor: typeof ForegroundColor,
    context = this.context,
  ): string {
    const loggerSign = chalk[primaryColor]('[SGLogger]  -');
    const timestamp = Logger.getTimestamp();
    const formattedContext = chalk.yellowBright(`[${context}]`);
    const formattedData = chalk[primaryColor](message.toString());

    return `${loggerSign} ${timestamp}  ${formattedContext} ${formattedData}`;
  }

  log(message: any, context?: LoggerContext): void {
    console.log(this.composeMessage(message, 'green', context));
  }

  debug(message: any, context?: LoggerContext): void {
    console.debug(this.composeMessage(message, 'magenta', context));
  }

  error(message: any, context?: LoggerContext): void {
    console.error(this.composeMessage(message, 'red', context));
  }

  warn(message: any, context?: LoggerContext): void {
    console.warn(this.composeMessage(message, 'yellowBright', context));
  }

  verbose(message: any, context?: LoggerContext): void {
    console.log(this.composeMessage(message, 'cyan', context));
  }
}

export default Logger;
