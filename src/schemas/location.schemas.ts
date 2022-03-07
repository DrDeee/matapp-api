import { Document, Schema, Types } from 'mongoose';
import { User } from './user.schema';

export type LocationDocument = Location & Document;

export enum MessengerType {
  WHATSAPP = 'whatsapp',
  MATRIX = 'matrix',
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
  SIGNAL = 'signal',
}

export interface Location {
  messenger: MessengerType;
  name: string;
  inviteUrl?: string;
  members: User[];
  attachments: string[];
}

export const LocationSchema = new Schema<Location>({
  messenger: {
    type: String,
    enum: Object.values(MessengerType),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  inviteUrl: {
    type: String,
    required: false,
  },
  members: {
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  },
  attachments: {
    type: [Types.ObjectId],
    ref: 'Attachment',
    required: false,
    default: [],
  },
});
LocationSchema.set('toJSON', {
  versionKey: false,
  transform: (doc: LocationDocument, ret: any) => {
    delete ret._id;
    ret['id'] = doc._id;
  },
});
