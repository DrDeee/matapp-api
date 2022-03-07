import { Document, Schema, Types } from 'mongoose';

export type TargetDocument = Target & Document;

export interface Target {
  name: string;
  localGroup?: string;
  phoneNumber?: string;
  matrix?: string;
  telegram?: string;
  discord?: string;
  notes: string[];
  attachments: string[];
}

export const TargetSchema = new Schema<Target>({
  name: {
    type: String,
    required: true,
  },
  localGroup: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  matrix: {
    type: String,
    required: false,
  },
  telegram: {
    type: String,
    required: false,
  },
  discord: {
    type: String,
    required: false,
  },
  notes: {
    type: [String],
    required: false,
    default: [],
  },
  attachments: {
    type: [Types.ObjectId],
    ref: 'Attachment',
    required: false,
    default: [],
  },
});

TargetSchema.set('toJSON', {
  versionKey: false,
  transform: (doc: TargetDocument, ret: any) => {
    delete ret._id;
    ret['id'] = doc._id;
  },
});
