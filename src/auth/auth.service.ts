import { Inject, Injectable, HttpException } from '@nestjs/common';
import { SignupDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import moment from 'moment';
import { BadRequestException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly usersService: UserService,
    private mailService: MailService,
    @Inject('MomentWrapper') private moment: moment.Moment,
  ) {}

  async create(signupDto: SignupDto) {
    try {
      const code: string = `${Math.floor(100000 + Math.random() * 900000)}`;
      const { phoneNumber } = signupDto;

      await this.prismaService.authentication.create({
        data: {
          phoneNumber: phoneNumber,
          code: code,
        },
      });

      //! Should replace email with phoneNumber later
      await this.mailService.sendVerificationCode(
        'b.kooshan85@gmail.com',
        code,
      );

      return new HttpException("Succesfull", HttpStatus.OK)
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'error creating code',
      });
    }
  }

  async verify(
    phoneNumber: string,
    code: string,
    res: Response,
  ): Promise<boolean> {
    const now = this.moment.toDate();
    const fiveMin = this.moment.subtract(5, 'minutes').toDate();

    const auth = await this.prismaService.authentication.findFirst({
      where: {
        phoneNumber,
        code,
        createdAt: {
          lte: now,
          gte: fiveMin,
        },
      },
    });

    if (auth) return res.ok;
    else throw new HttpException('Wrong Code', HttpStatus.FORBIDDEN);
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
