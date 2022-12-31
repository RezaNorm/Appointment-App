import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(
    @Body() createUser: Prisma.UserCreateInput,
  ): Promise<{ token: string }> {
    return this.usersService.createUser(createUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }
}
