import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt/dist';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization.replace('Bearer ', '');
    const validateToken = this.jwtService.verify(token, {
      secret: process.env.SECRET_TOKEN,
    });

    if (validateToken) {
      request.user = validateToken
      return true;
    } else throw new UnauthorizedException();
  }
}
