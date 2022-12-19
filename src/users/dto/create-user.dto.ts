import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    avatar?: string

    @IsString()
    @ApiProperty()
    name: string

    @IsDate()
    @ApiProperty()
    startWorkTime: Date

    @IsDate()
    @ApiProperty()
    offWorkTime: Date

    @IsString()
    @ApiProperty()
    mobileNumber: string;

    @IsNumber()
    @ApiProperty()
    businessUnitId: number

    @IsNumber()
    @ApiProperty()
    serviceGroupId: number
}
