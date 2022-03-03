import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CaseDto, CreateCaseDto, UpdateCaseDto } from 'src/dtos/cases.dtos';
import { CasesService } from './cases.service';

@Controller('cases')
@ApiBearerAuth()
@ApiTags('Cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  @ApiOkResponse({ type: [CaseDto] })
  async getAll() {
    return await this.casesService.getAllCases();
  }

  @Post()
  @ApiCreatedResponse({ type: CaseDto })
  @ApiNotFoundResponse()
  async create(@Body() newCase: CreateCaseDto) {
    try {
      return await this.casesService.createCase(newCase);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ type: CaseDto })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'full', type: Boolean, required: false })
  async getOne(@Param('id') id: string, @Query('full') full: string) {
    const myCase = await this.casesService.getCaseById(
      id,
      full && full.toLowerCase() === 'true',
    );
    if (myCase) return myCase;
    else throw new NotFoundException();
  }

  @Put('/:id')
  @ApiOkResponse({ type: CaseDto })
  @ApiNotFoundResponse()
  async updateOne(@Param('id') id: string, @Body() updates: UpdateCaseDto) {
    try {
      const myCase = await this.casesService.updateCaseById(id, updates);
      if (myCase) return myCase;
      else throw new NotFoundException('Case not found.');
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    const myCase = await this.casesService.deleteCaseById(id);
    if (myCase) return;
    else throw new NotFoundException();
  }
}
