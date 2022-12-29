import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly usersService: UserService,
    private mailService: MailService,
    @Inject('MomentWrapper') private momentWrapper: moment.Moment,
  ) {}

  async create(loginDto: LoginDto) {
    const code: string = `${Math.floor(100000 + Math.random() * 900000)}`;
    const { phoneNumber } = loginDto

    await this.prismaService.authentication.create({
      data: {
        phoneNumber: phoneNumber,
        code: code,
      },
    });

    // Should replace email with phoneNumber later
    await this.mailService.sendVerificationCode('b.kooshan85@gmail.com', code);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async verify(phoneNumber: string, code: string): Promise<string> {
    const now = this.momentWrapper;
    const fiveMin = this.momentWrapper.subtract(5, 'minutes');

    console.log('now', now);
    console.log('minus min', fiveMin);
    // this.prismaService.authentication.findFirst({
    //   where: {
    //     phoneNumber,
    //     createdAt: {
    //       lte: new Date(),
    //       gte: `moment`,
    //     },
    //   },
    // });
    return 'token';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
