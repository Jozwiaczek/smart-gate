import chalk, { ForegroundColor } from 'chalk';

class Logger {
  constructor(private context: string) {}

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
    const formattedData = chalk[primaryColor](JSON.stringify(message));

    return `${loggerSign} ${timestamp}  ${formattedContext} ${formattedData}`;
  }

  log(message: any, context?: string): void {
    console.log(this.composeMessage(message, 'green', context));
  }

  debug(message: any, context?: string): void {
    console.debug(this.composeMessage(message, 'magenta', context));
  }

  error(message: any, context?: string): void {
    console.error(this.composeMessage(message, 'red', context));
  }

  warn(message: any, context?: string): void {
    console.warn(this.composeMessage(message, 'yellowBright', context));
  }

  verbose(message: any, context?: string): void {
    console.log(this.composeMessage(message, 'cyan', context));
  }
}

export default Logger;
