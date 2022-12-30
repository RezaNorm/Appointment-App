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
          port: 465,
          secure: true,
          auth: {
            user: /* config.get('SENDER_EMAIL') */ process.env.SENDER_EMAIL,
            pass: /* config.get('SENDER_PASS') */ process.env.SENDER_PASSWORD,
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
