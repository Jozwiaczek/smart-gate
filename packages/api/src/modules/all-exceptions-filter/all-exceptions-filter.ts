import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { SentryService } from '../sentry/sentry.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly sentryService: SentryService) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    console.log(exception);

    this.sentryService.captureException(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
