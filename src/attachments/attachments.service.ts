import { Model } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttachmentDocument } from 'src/schemas/attatchment.schema';
import { createHmac } from 'crypto';
import {
  writeFileSync,
  unlinkSync,
  ensureDirSync,
  pathExistsSync,
  createReadStream,
  existsSync,
  readdirSync,
  Dirent,
  rmSync,
} from 'fs-extra';
import { join } from 'path';
import { LinksService } from './links/links.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel('Attachment')
    private readonly attachmentModel: Model<AttachmentDocument>,
    @Inject(forwardRef(() => LinksService))
    private readonly linksService: LinksService,
  ) {}

  async getAllAttachments() {
    return await this.attachmentModel.find({});
  }

  async getAttachment(id: string) {
    try {
      return await this.attachmentModel.findById(id);
    } catch (e) {
      return null;
    }
  }

  async getAttachmentContent(id: string, hash: string) {
    const dir = join(process.env.ATTACHMENTS_DIR || './data', id);
    if (pathExistsSync(dir) && existsSync(join(dir, hash))) {
      return createReadStream(join(dir, hash));
    } else {
      return null;
    }
  }

  async createAttachment(file: Express.Multer.File) {
    const attachmentDoc = new this.attachmentModel();
    attachmentDoc.name = file.originalname;
    attachmentDoc.mimeType = file.mimetype;
    attachmentDoc.size = file.size;

    const hmac = createHmac(
      'sha256',
      process.env.HASH_SECRET || 'a very p0werfulI sEcret',
    );
    hmac.update(file.buffer);
    attachmentDoc.hash = hmac.digest('hex');

    const ret = await attachmentDoc.save();
    const folder = join(process.env.ATTACHMENTS_DIR || './data', ret.id);
    try {
      ensureDirSync(folder);
      writeFileSync(join(folder, ret.hash), file.buffer);
    } catch (e) {
      console.log(e);
      await this.deleteAttachment(ret.id);
      return null;
    }

    return await ret;
  }

  async deleteAttachment(id: string, deleteFile = true) {
    try {
      const attachment = await this.attachmentModel.findByIdAndDelete(id);
      if (deleteFile) {
        try {
          unlinkSync(
            join(
              process.env.ATTACHMENTS_DIR || './data',
              attachment.id,
              attachment.hash,
            ),
          );
        } catch (e) {
          console.error(
            'Could not delete attachment ' + attachment.id + '.',
            e,
          );
        }
      }
      await this.linksService.unlinkAll(attachment.id);
      return attachment;
    } catch (e) {
      return null;
    }
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async clearAttachments() {
    const attachments = await this.getAllAttachments();
    const dir = join(process.env.ATTACHMENTS_DIR || './data');

    const files: Dirent[] = readdirSync(dir, { withFileTypes: true });

    const foundAttachments = [];

    files.forEach((file) => {
      if (file.isDirectory()) {
        const attachment = attachments.find((a) => a.id === file.name);
        if (attachment) {
          const innerFiles = readdirSync(join(dir, file.name), {
            withFileTypes: true,
          }) as Dirent[];
          let found = false;
          innerFiles.forEach((f) => {
            if (f.name === attachment.hash && f.isFile()) {
              found = true;
              foundAttachments.push(attachment.id);
            } else {
              rmSync(join(dir, file.name, f.name), {
                force: true,
                recursive: true,
              });
            }
          });
          if (!found)
            rmSync(join(dir, file.name), { recursive: true, force: true });
        } else {
          rmSync(join(dir, file.name), { recursive: true, force: true });
        }
      } else {
        unlinkSync(join(dir, file.name));
      }
    });

    attachments
      .filter((a) => !foundAttachments.includes(a.id))
      .forEach((a) => this.deleteAttachment(a.id, false));
  }
}
