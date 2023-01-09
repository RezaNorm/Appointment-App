import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/user.module';
// import { RequestService } from './request.service';
// import { AuthenticationMiddleware, TestMiddleware } from './middleware/authentication.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UnitModule } from './unit/unit.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TestMiddleware } from './middleware/test.middleware';
import { Get } from '@nestjs/common';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ServicesModule,
    UsersModule,
    UnitModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware)
      .forRoutes({ path: '/auth/test', method: RequestMethod.GET });
  }
}
