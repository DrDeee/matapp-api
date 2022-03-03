import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { CaseType } from 'src/schemas/case.schema';
import { TargetDto } from './targets.dtos';

const votingRegex =
  /^[1-9]{0,1}[0-9]{1}\/[1-9]{0,1}[0-9]{1}\/[1-9]{0,1}[0-9]{1}$/;

export class CaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: String, enum: Object.values(CaseType) })
  type: CaseType;

  @ApiProperty({ type: TargetDto })
  target: TargetDto;

  @ApiProperty()
  location: string;

  @ApiProperty()
  annunciator: string;

  @ApiProperty()
  executor: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  startDate: number;

  @ApiProperty({ required: false })
  endDate?: number;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({
    required: false,
    description: 'Das Abstimmungsergebnis, im Format ++/00/--',
  })
  voting?: string;
}

export class CreateCaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  target: string;

  @ApiProperty({ type: String, enum: Object.values(CaseType) })
  @IsString()
  @IsIn(Object.values(CaseType))
  type: CaseType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  annunciator: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  executor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  startDate: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  endDate?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Matches(votingRegex)
  @IsOptional()
  voting?: string;
}

export class UpdateCaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  target: string;

  @ApiProperty({ type: String, enum: Object.values(CaseType) })
  @IsString()
  @IsIn(Object.values(CaseType))
  @IsOptional()
  type: CaseType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  annunciator: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  executor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  reason: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  startDate: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  endDate?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Matches(votingRegex)
  @IsOptional()
  voting?: string;
}
