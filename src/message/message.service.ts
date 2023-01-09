import { Injectable, Inject } from '@nestjs/common';
import kavenegar from 'kavenegar';

@Injectable()
export class MessageService {
  constructor(
    @Inject('kavenegar')
    private kavenegarInstance: kavenegar.kavenegar.KavenegarInstance,
  ) {}

  async sendMessage(message: string, receptor: string) {
    console.log({ message, receptor });
    return this.kavenegarInstance.Send(
      { message, sender: process.env.SENDER_NUMBER, receptor },
      (response) => response,
    );
  }
}
