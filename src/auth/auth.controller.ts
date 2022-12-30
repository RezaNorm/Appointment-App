import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/login.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createAuthDto: SignupDto): Promise<HttpException> {
    return this.authService.create(createAuthDto);
  }

  @Post('verify')
  async verify(
    @Body('phoneNumber') phoneNumber: string,
    @Body('code') code: string,
    @Res() response: Response,
  ): Promise<boolean> {
    return await this.authService.verify(phoneNumber, code, response);
  }

  
}
