import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;
  @ApiProperty({ required: false, nullable: true })
  avatar: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  startWorkTime: Date;
  @ApiProperty()
  offWorkTime: Date;
  @ApiProperty()
  mobileNumber: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  businessUnitId: number;
  @ApiProperty()
  serviceGroupId: number;
}
