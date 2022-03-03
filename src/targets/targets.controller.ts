import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddTargetNoteDto,
  CreateTargetDto,
  TargetDto,
  UpdateTargetDto,
} from 'src/dtos/targets.dtos';
import { TargetsService } from './targets.service';

@Controller('targets')
@ApiTags('Targets')
@ApiBearerAuth()
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}
  @Get()
  @ApiOkResponse({
    type: [TargetDto],
  })
  async getAll() {
    return await this.targetsService.getAllTargets();
  }

  @Post()
  @ApiCreatedResponse({
    type: TargetDto,
  })
  async create(@Body() newTarget: CreateTargetDto) {
    return await this.targetsService.createNewTarget(newTarget);
  }

  @Get('/:id')
  @ApiOkResponse({
    type: TargetDto,
  })
  @ApiNotFoundResponse()
  async getOne(@Param('id') id: string) {
    const target = await this.targetsService.getTargetById(id);
    if (target) return target;
    throw new NotFoundException();
  }

  @Put('/:id')
  @ApiOkResponse({
    type: TargetDto,
  })
  @ApiNotFoundResponse()
  async updateOne(@Param('id') id: string, @Body() update: UpdateTargetDto) {
    const target = await this.targetsService.updateTargetById(id, update);
    if (target) return target;
    throw new NotFoundException();
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    const target = await this.targetsService.deleteTargetById(id);
    if (target) return;
    throw new NotFoundException();
  }

  @Post('/:id/notes')
  @ApiOkResponse({ type: TargetDto })
  @ApiNotFoundResponse()
  async addNote(@Param('id') id: string, @Body() body: AddTargetNoteDto) {
    const target = await this.targetsService.addNoteToTarget(id, body.content);
    if (target) return target;
    throw new NotFoundException();
  }

  @Delete('/:id/notes/:noteIndex')
  @ApiOkResponse({ type: TargetDto })
  @ApiNotFoundResponse()
  async removeNote(
    @Param('id') id: string,
    @Param('noteIndex') noteIndex: number,
  ) {
    const target = await this.targetsService.removeNoteFromTarget(
      id,
      noteIndex,
    );
    if (target) return target;
    throw new NotFoundException();
  }
}
