import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  externalId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty({ required: false })
  displayName?: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  displayName: string;
}
