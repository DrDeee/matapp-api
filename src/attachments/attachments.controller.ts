import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Response,
  Post,
  UseInterceptors,
  UploadedFiles,
  StreamableFile,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddAttachmentsDto, AttachmentDto } from 'src/dtos/attachment.dtos';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
@ApiTags('Attachments')
@ApiBearerAuth()
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  @ApiOkResponse({ type: [AttachmentDto] })
  async getAll() {
    return await this.attachmentsService.getAllAttachments();
  }

  @Get('/cleanup')
  @ApiNoContentResponse()
  async cleanup() {
    await this.attachmentsService.clearAttachments();
  }

  @Get('/:id')
  @ApiOkResponse({ type: AttachmentDto })
  @ApiNotFoundResponse()
  async get(@Param('id') id: string) {
    const attachment = await this.attachmentsService.getAttachment(id);
    if (attachment) return attachment;
    else throw new NotFoundException('Attachment not found.');
  }

  @Delete('/:id')
  @ApiOkResponse({ type: AttachmentDto })
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const attachment = await this.attachmentsService.deleteAttachment(id);
    if (attachment) return attachment;
    else throw new NotFoundException('Attachment not found.');
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AddAttachmentsDto,
  })
  @ApiOkResponse({
    type: [AttachmentDto],
  })
  @ApiNotFoundResponse()
  @UseInterceptors(FilesInterceptor('attachments', undefined))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const ret = [];
    for (const file of files) {
      const attachment = await this.attachmentsService.createAttachment(file);
      if (attachment) ret.push(attachment);
    }
    return ret;
  }

  @Get('/download/:id')
  @ApiOkResponse({
    schema: {
      title: 'Die Datei',
      type: 'string',
      format: 'binary',
    },
  })
  @ApiNotFoundResponse()
  async download(
    @Param('id') id: string,
    @Response({ passthrough: true }) res,
  ) {
    const attachment = await this.attachmentsService.getAttachment(id);
    if (attachment) {
      const content = await this.attachmentsService.getAttachmentContent(
        id,
        attachment.hash,
      );
      if (!content) {
        await this.attachmentsService.deleteAttachment(id);
        throw new NotFoundException('Attachment not found.');
      }
      res.set({
        'Content-Type': attachment.mimeType,
        'Content-Disposition': `attachment; filename="${attachment.name}"`,
      });
      return new StreamableFile(content);
    } else {
      await this.attachmentsService.deleteAttachment(id);
      throw new NotFoundException('Attachment not found.');
    }
  }
}
