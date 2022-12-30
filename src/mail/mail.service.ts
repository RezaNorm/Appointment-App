import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const notification = await this.mailService.sendMail({
      subject: 'کد تایید',
      to: email,
      html: code,
    });
    console.log({ notification });
  }
}
