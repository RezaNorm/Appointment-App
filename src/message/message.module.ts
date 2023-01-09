import { Module, Scope } from '@nestjs/common';
import { MessageService } from './message.service';
import * as kavenegar from 'kavenegar';

@Module({
  providers: [
    MessageService,
    {
      provide: 'kavenegar',
      useValue: kavenegar.KavenegarApi({
        apikey: process.env.KAVENEGAR_KEY,
      }),
      scope: Scope.REQUEST,
    },
  ],
  exports: [MessageService],
})
export class MessageModule {}
