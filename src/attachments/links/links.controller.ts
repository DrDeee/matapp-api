import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CaseDto } from 'src/dtos/cases.dtos';
import { LocationDto } from 'src/dtos/locations.dtos';
import { TargetDto } from 'src/dtos/targets.dtos';
import { LinksService } from './links.service';

@Controller('attachments/:id/links')
@ApiTags('Attachments-Links')
@ApiBearerAuth()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/cases/:caseId')
  @ApiOkResponse({ type: CaseDto })
  @ApiNotFoundResponse()
  async linkCase(
    @Param('id') attachmentId: string,
    @Param('caseId') caseId: string,
  ) {
    try {
      return await this.linksService.linkAttachmentToCase(attachmentId, caseId);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Delete('/cases/:caseId')
  @ApiOkResponse({ type: CaseDto })
  @ApiNotFoundResponse()
  async unlinkCase(
    @Param('id') attachmentId: string,
    @Param('caseId') caseId: string,
  ) {
    try {
      return await this.linksService.unlinkAttachmentFromCase(
        attachmentId,
        caseId,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Post('/targets/:targetId')
  @ApiOkResponse({ type: TargetDto })
  @ApiNotFoundResponse()
  async linkTarget(
    @Param('id') attachmentId: string,
    @Param('targetId') targetId: string,
  ) {
    try {
      return await this.linksService.linkAttachmentToTarget(
        attachmentId,
        targetId,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Delete('/targets/:targetId')
  @ApiOkResponse({ type: TargetDto })
  @ApiNotFoundResponse()
  async unlinkTarget(
    @Param('id') attachmentId: string,
    @Param('targetId') targetId: string,
  ) {
    try {
      return await this.linksService.unlinkAttachmentFromTarget(
        attachmentId,
        targetId,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Post('/locations/:locationId')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async linkLocation(
    @Param('id') attachmentId: string,
    @Param('locationId') locationId: string,
  ) {
    try {
      return await this.linksService.linkAttachmentToLocation(
        attachmentId,
        locationId,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Delete('/locations/:locationId')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async unlinkLocation(
    @Param('id') attachmentId: string,
    @Param('locationId') locationId: string,
  ) {
    try {
      return await this.linksService.unlinkAttachmentFromLocation(
        attachmentId,
        locationId,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
