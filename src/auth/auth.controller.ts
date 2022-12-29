import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() createAuthDto: LoginDto): Promise<void> {
    return this.authService.create(createAuthDto);
  }

  @Post('verify')
  verify(@Body() phoneNumber: string , code: string) {
    return this.authService.verify(phoneNumber, code)
  }
}
