import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/user.service';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: process.env.SECRET_TOKEN,
    });
  }

  async validate(validationPayload: any): Promise<User> {
    // console.log("jwt validate");
    const user = await this.userService.findOne(+validationPayload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
