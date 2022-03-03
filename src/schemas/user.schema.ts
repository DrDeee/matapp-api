import { Document, Schema } from 'mongoose';

export type UserDocument = User & Document;

export interface User {
  externalId: string;
  userName: string;
  displayName?: string;
}

export const UserSchema = new Schema<User>({
  externalId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: false,
  },
});

UserSchema.set('toJSON', {
  versionKey: false,
  transform: (doc: UserDocument, ret: any) => {
    delete ret._id;
    ret['id'] = doc._id;
  },
});
