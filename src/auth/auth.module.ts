import { Module, Scope } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import * as moment from 'moment';

@Module({
  imports: [MailModule, UsersModule, PrismaModule,],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'MomentWrapper',
      useValue: moment(),
      scope: Scope.REQUEST,
    },
  ],
})
export class AuthModule {}
