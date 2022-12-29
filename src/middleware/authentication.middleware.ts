// import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import { RequestService } from 'src/request.service';

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//   private readonly logger = new Logger(AuthenticationMiddleware.name);

//   constructor(private readonly requestService: RequestService) {}

//   use(req: Request, res: Response, next: NextFunction): void {
//     this.logger.log(AuthenticationMiddleware.name);

//     //get user id from token and find the user in database
//     const token = req.headers.authorization; 
//     const userId = '122';

//     this.requestService.setUserId(userId);
//   }
// }
