import { Document, Schema } from 'mongoose';

export type AttachmentDocument = Attachment & Document;

export interface Attachment {
  name: string;
  mimeType: string;
  hash: string;
  size: number;
}

export const AttachmentSchema = new Schema<Attachment>({
  name: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

AttachmentSchema.virtual('attachmentUrl').get(function () {
  return '/attachments/' + this._id;
});

AttachmentSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc: AttachmentDocument, ret: any) => {
    delete ret._id;
    delete ret.hash;
    ret['id'] = doc._id;
  },
});
