import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @ApiProperty()
  serviceName: string;

  @IsNumber()
  @ApiProperty()
  serviceFee: number;

  @IsBoolean()
  @ApiProperty()
  isPrepayable: Boolean;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  discount: number;

  @IsNumber()
  @ApiProperty()
  serviceGroupId: number
}
