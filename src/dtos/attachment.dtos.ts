import { ApiProperty } from '@nestjs/swagger';

export class AttachmentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  mimeType: string;
}

export class AddAttachmentsDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  attachments: any;
}
