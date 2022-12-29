import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'mail.clposting.ca',
          secure: false,
          auth: {
            user: /* config.get('SENDER_EMAIL') */ 'narimisa@clposting.ca',
            pass: /* config.get('SENDER_PASS') */ 'Vbf0xL8,HMW]',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
