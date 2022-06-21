import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;
}