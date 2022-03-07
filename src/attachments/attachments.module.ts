import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesModule } from 'src/cases/cases.module';
import { AttachmentSchema } from 'src/schemas/attatchment.schema';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
    CasesModule,
    forwardRef(() => LinksModule),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
