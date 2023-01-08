import { Injectable, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(
    createUser: Prisma.UserCreateInput,
  ): Promise<{ token: string }> {
    const { password } = createUser;
    let hash: string;

    if (password) hash = await bcrypt.hash(password, 10);
    delete createUser['password'];

    const user = await this.prisma.user.create({
      data: { ...createUser, password: hash || '' },
    });

    const payload = {
      sub: user.id,
      name: user.name,
      phoneNumber: user.mobileNumber,
    };

    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_TOKEN,
        expiresIn: "8755h"
      }),
    };
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByNumber(mobileNumber: string): Promise<User> {
    console.log(mobileNumber);
    const user = await this.prisma.user.findFirst({
      where: {
        mobileNumber,
      },
    });
    console.log(user);
    return user;
  }
}
