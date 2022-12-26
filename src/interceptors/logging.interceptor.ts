import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { RequestService } from 'src/request.service';

export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.log(`
    ${userAgent} ${ip} ${method} ${url}: ${context.getClass().name} ${
      context.getHandler().name
    } was called...`);

    this.logger.debug(
      'user id from middleware ',
      this.requestService.getUserId(),
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res: Response) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(`
            ${method} ${url} ${statusCode} ${contentLength} = ${userAgent} ${ip}: ${
          Date.now() - now
        }
        `);
      }),
    );
  }
}
