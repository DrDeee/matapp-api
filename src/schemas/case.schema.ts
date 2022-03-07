import { Document, Types, Schema } from 'mongoose';
import { Target } from './target.schema';
import { User } from './user.schema';

export type CaseDocument = Case & Document;

export enum CaseType {
  BAN = 'ban',
  WARNING = 'warn',
}

export interface Case {
  type: CaseType;
  target: Target;
  location: Location;
  annunciator: User;
  executor: User;
  reason: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  voting?: string;
  attachments: string[];
}

export const CaseSchema = new Schema<Case>({
  type: {
    type: String,
    enum: Object.values(CaseType),
    required: true,
  },
  target: {
    type: Types.ObjectId,
    ref: 'Target',
    required: true,
  },
  location: {
    type: Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  annunciator: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  executor: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  voting: {
    type: String,
    required: false,
  },
  attachments: {
    type: [Types.ObjectId],
    ref: 'Attachment',
    required: false,
    default: [],
  },
});

CaseSchema.set('toJSON', {
  versionKey: false,
  transform: (doc: CaseDocument, ret: any) => {
    delete ret._id;
    ret['id'] = doc._id;

    ret.startDate = doc.startDate.getTime();
    ret.endDate = doc.endDate ? doc.endDate.getTime() : undefined;
  },
});
