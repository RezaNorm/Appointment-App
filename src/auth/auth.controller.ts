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
import { LoginDto } from './dto/login.dto';
import { HttpException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() createAuthDto: LoginDto): Promise<HttpException> {
    return this.authService.createVerification(createAuthDto);
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
