import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { HttpException, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verification')
  async create(@Body() createAuthDto: LoginDto): Promise<HttpException> {
    return this.authService.createVerification(createAuthDto);
  }

  @Post('verify')
  async verify(
    @Body('phoneNumber') phoneNumber: string,
    @Body('code') code: string,
  ): Promise<boolean> {
    return await this.authService.verifyCode(phoneNumber, code);
  }

  @Post('customer/signup')
  async signup(
    @Body('name') name: string,
    @Body('mobileNumber') mobileNumber: string,
  ) {
    return this.authService.signUp(name, mobileNumber);
  }

  @UseGuards(LocalGuard)
  @Get('test')
  async test(@Req() req) {
    const user = req.user
    console.log(user);
  }
}
