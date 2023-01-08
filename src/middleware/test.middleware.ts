import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request.service';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TestMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(TestMiddleware.name);
    this.logger.log('header', req.headers);
    next();
  }
}
