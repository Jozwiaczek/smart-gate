import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as Constants from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { Transaction } from '@sentry/types';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SENTRY_IGNORE_EXCEPTION_KEY } from './decorators/sentry-ignore-exception.decorator';
import { SENTRY_TRANSACTION_KEY } from './decorators/use-sentry-transaction.decorator';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const classPath: string = this.reflector.get<string>(
      Constants.PATH_METADATA,
      context.getClass(),
    );
    const handlerPath: string = this.reflector.get<string>(
      Constants.PATH_METADATA,
      context.getHandler(),
    );
    const { method } = context.switchToHttp().getRequest<{ method: string }>();

    Sentry.configureScope((scope) => {
      scope.setFingerprint(['{{ default }}', method, classPath, handlerPath]);
    });

    const isSentryTransaction = this.reflector.getAllAndOverride<boolean | undefined>(
      SENTRY_TRANSACTION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const transactionName = `[${method}] /${classPath}/${handlerPath}`;

    let transaction: Transaction;

    if (isSentryTransaction) {
      transaction = Sentry.startTransaction({ name: transactionName });
      Sentry.configureScope((scope) => scope.setSpan(transaction));
    }

    return next.handle().pipe(
      catchError((error) => {
        const isSentryIgnoreException = this.reflector.getAllAndOverride<boolean | undefined>(
          SENTRY_IGNORE_EXCEPTION_KEY,
          [context.getHandler(), context.getClass()],
        );

        if (!isSentryIgnoreException) {
          Sentry.captureException(error);
        }

        throw error;
      }),
      // TODO: check is it working with promises
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      finalize(async () => {
        transaction?.finish();
        await Sentry.flush();
        Sentry.configureScope((scope) => scope.clear());
      }),
    );
  }
}
