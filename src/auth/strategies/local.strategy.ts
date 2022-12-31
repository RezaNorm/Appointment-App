import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserService } from '../../users/user.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'mobileNumber',
      passwordField: 'code',
    });
  }

  async validate(mobileNumber: string, code: string): Promise<User> {
    console.log(mobileNumber);
    const user = await this.authService.verifyCodeWithUser(mobileNumber, code);
    // if (!user) throw new UnauthorizedException();
    return user;
  }
}
