import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  avatar?: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsDate()
  @ApiProperty()
  startWorkTime?: Date;

  @IsDate()
  @ApiProperty()
  offWorkTime?: Date;

  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  mobileNumber: string;

  @IsNumber()
  @ApiProperty()
  businessUnitId: number;

  @IsNumber()
  @ApiProperty()
  serviceGroupId?: number;
}
