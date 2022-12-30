import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @ApiProperty()
  phoneNumber: string;
}
