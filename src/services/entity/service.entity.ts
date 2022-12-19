import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';

export class ServiceEntity implements Service {
  @ApiProperty()
  id: number;
  @ApiProperty()
  serviceName: string;
  @ApiProperty()
  serviceFee: number;
  @ApiProperty({ required: false })
  isPrepayable: boolean;
  @ApiProperty({ required: false, nullable: true })
  description: string;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  serviceGroupId: number;
}
