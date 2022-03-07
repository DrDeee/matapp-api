import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { PhoneNumber } from 'src/phone.validator';
import { AttachmentDto } from './attachment.dtos';

const matrixRegex = /^@[A-Z0-9._=-]+:[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const telegramRegex = /^@[A-Z0-9]{1}[A-Z0-9_]{3,}[A-Z0-9]{1}$/i;
const discordRegex = /^[1-9]{1}[0-9]{16,17}$/;

export class TargetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  matrix?: string;

  @ApiProperty({ required: false })
  telegram?: string;

  @ApiProperty({ required: false })
  discord?: string;

  @ApiProperty()
  notes: string[];

  @ApiProperty({ type: [AttachmentDto] })
  attachments: AttachmentDto[];
}

export class CreateTargetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  localGroup?: string;

  @ApiProperty({ required: false })
  @Validate(PhoneNumber)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(matrixRegex, { message: 'Invalid matrix id' })
  @IsOptional()
  matrix?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(telegramRegex, { message: 'Invalid telegram username' })
  @IsOptional()
  telegram?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(discordRegex, { message: 'Invalid discord user id' })
  @IsOptional()
  discord?: string;
}

export class UpdateTargetDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  localGroup?: string;

  @ApiProperty({ required: false })
  @Validate(PhoneNumber)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(matrixRegex, { message: 'Invalid matrix id' })
  @IsOptional()
  matrix?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(telegramRegex, { message: 'Invalid telegram username' })
  @IsOptional()
  telegram?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @Matches(discordRegex, { message: 'Invalid discord user id' })
  @IsOptional()
  discord?: number;
}

export class AddTargetNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
