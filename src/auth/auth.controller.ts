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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ValidateTokenGuard } from './guards/validate-token.guard';
import { Request } from 'express';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verification')
  async create(@Body() createAuthDto: LoginDto) {
    return await this.authService.createVerification(createAuthDto);
  }

  @Post('verify')
  async verify(
    @Body('phoneNumber') phoneNumber: string,
    @Body('code') code: string,
  ) {
    return await this.authService.verifyCode(phoneNumber, code);
  }

  @Post('customer/signup')
  async signup(
    @Body('name') name: string,
    @Body('mobileNumber') mobileNumber: string,
  ) {
    return this.authService.signUp(name, mobileNumber);
  }

  @UseGuards(ValidateTokenGuard)
  @Get('test')
  async test(@CurrentUser() user: User) {
    console.log('route called', user);
  }
}
