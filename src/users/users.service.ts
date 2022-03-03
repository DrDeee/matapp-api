import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UpdateUserDto } from 'src/dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    return await this.userModel.find({});
  }

  async updateUser(id: string, updates: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async getUserById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      return null;
    }
  }
}
