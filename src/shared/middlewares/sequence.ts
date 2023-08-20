import { MiddlewareSequence, RequestContext } from '@loopback/rest';
import { logResponseMiddleware } from './use-after';
import { logRequestMiddleware, requestIdMiddleware } from './use-before';

export class CustomSequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    this.useBeforeMiddlewares(context);
    await super.handle(context);
    this.useAfterMiddlewares(context);
  }

  private useBeforeMiddlewares(context: RequestContext): void {
    requestIdMiddleware(context);
    logRequestMiddleware(context);
  }

  private useAfterMiddlewares(context: RequestContext): void {
    logResponseMiddleware(context);
  }
}
