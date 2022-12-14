import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          status: HttpStatus.CONFLICT,
          message,
        });
        // TODO:
        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
