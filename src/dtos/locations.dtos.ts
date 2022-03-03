import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MessengerType } from 'src/schemas/location.schemas';
import { UserDto } from './users.dtos';

export class LocationDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: Object.values(MessengerType) })
  messenger: MessengerType;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  inviteUrl?: string;

  @ApiProperty({ type: [UserDto] })
  members: UserDto[];
}

export class UpdateLocationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  inviteUrl?: string;
}

export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Object.values(MessengerType) })
  @IsString()
  @IsIn(Object.values(MessengerType))
  messenger: MessengerType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  inviteUrl?: string;
}
