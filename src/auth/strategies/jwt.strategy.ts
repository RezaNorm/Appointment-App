import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/user.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_TOKEN,
    });
  }

  async validate(validationPayload: {
    sub: number;
    name: string;
    phoneNumber: string;
  }): Promise<User | null> {
    console.log("jwt validate");
    return await this.userService.findOne(+validationPayload.sub);
  }
}
