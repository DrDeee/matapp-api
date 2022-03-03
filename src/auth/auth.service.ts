import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private userCache: { [key: string]: UserDocument } = {};
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async syncUser(userId: string, userName: string) {
    if (!this.userCache[userId]) {
      const user = await this.userModel.findOne({ externalId: userId });
      if (user) this.userCache[userId] = user;
      else {
        this.logger.log('First login: ' + userName);
        this.userCache[userId] = (
          await this.userModel.create([
            { externalId: userId, userName: userName },
          ])
        )[0];
      }
    }
    return this.userCache[userId];
  }

  @OnEvent('auth.cache.clear')
  clearCache(payload: any) {
    if (payload.full) this.userCache = {};
    else if (payload.user) this.userCache[payload.user] = undefined;
  }
}
