import { Inject, Injectable, HttpException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { MailService } from '../mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import moment from 'moment';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly usersService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
    @Inject('MomentWrapper') private moment: moment.Moment,
  ) {}

  async createVerification(loginDto: LoginDto) {
    try {
      const code: string = `${Math.floor(100000 + Math.random() * 900000)}`;
      const { phoneNumber } = loginDto;

      await this.prismaService.authentication.create({
        data: {
          phoneNumber: phoneNumber,
          code: code,
        },
      });

      console.log(code);

      //! Should replace email with phoneNumber later
      // await this.mailService.sendVerificationCode(
      //   'b.kooshan85@gmail.com',
      //   code,
      // );

      return new HttpException('Succesfull', HttpStatus.OK);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'error creating code',
      });
    }
  }

  async verifyCode(phoneNumber: string, code: string): Promise<any> {
    const now = this.moment.toDate();
    const fiveMinAgo = this.moment.subtract(5, 'minutes').toDate();

    const auth = await this.prismaService.authentication.findFirst({
      where: {
        phoneNumber,
        code,
        createdAt: {
          lte: now,
          gte: fiveMinAgo,
        },
      },
    });

    //! if user with specified phone number exists it shouldn't ask for name
    // const user = await this.prismaService.user.findFirst({
    //   where: {
    //     mobileNumber: phoneNumber,
    //   },
    // });

    if (auth) return HttpStatus.OK;
    // if (user && auth) return user;
    else throw new HttpException('something went wrong', HttpStatus.FORBIDDEN);
  }

  async verifyCodeWithUser(mobileNumber: string, code: string) {
    const now = this.moment.toDate();
    const fiveMinAgo = this.moment.subtract(5, 'minutes').toDate();

    const auth = await this.prismaService.authentication.findFirst({
      where: {
        phoneNumber: mobileNumber,
        code,
        createdAt: {
          lte: now,
          gte: fiveMinAgo,
        },
      },
    });

    //! if user with specified phone number exists it shouldn't ask for name
    const user = await this.prismaService.user.findFirst({
      where: {
        mobileNumber,
      },
    });

    if (user) return user;
    // if (user && auth) return user;
    else throw new HttpException('something went wrong', HttpStatus.FORBIDDEN);
  }

  async findByNumber(mobileNumber: string): Promise<User> {
    const user = await this.usersService.findUserByNumber(mobileNumber);
    console.log(user);
    return user;
  }

  async signUp(name: string, mobileNumber: string): Promise<{ token: string }> {
    return await this.usersService.createUser({ name, mobileNumber });
  }

  async validateUser(name: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        name,
      },
    });

    if (user) {
      const { password: userPassword } = user;
      const comparedPass = await bcrypt.compare(password, userPassword);
      if (comparedPass) return user;
    }
    return null;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.SECRET_TOKEN,
    });

    const { sub: id } = decoded;
    const user = await this.usersService.findOne(id);
    return user;
  }
}
