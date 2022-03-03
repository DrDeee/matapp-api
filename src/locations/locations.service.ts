import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocationDocument } from 'src/schemas/location.schemas';
import { CreateLocationDto, UpdateLocationDto } from 'src/dtos/locations.dtos';
import { UsersService } from 'src/users/users.service';
import { CaseDocument } from 'src/schemas/case.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel('Location')
    private readonly locationModel: Model<LocationDocument>,
    private readonly usersService: UsersService,
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
  ) {}

  async getAllLocations() {
    return await this.locationModel.find({}).populate('members');
  }

  async createNewLocation(newLocation: CreateLocationDto) {
    const location = new this.locationModel(newLocation);
    return await location.save();
  }
  async getLocationById(id: string) {
    try {
      return await this.locationModel.findById(id).populate('members');
    } catch (e) {
      return null;
    }
  }
  async updateLocationById(id: string, updates: UpdateLocationDto) {
    try {
      return await this.locationModel
        .findByIdAndUpdate(id, updates, {
          new: true,
        })
        .populate('members');
    } catch (e) {
      return null;
    }
  }
  async deleteLocationById(id: string) {
    try {
      const location = await this.locationModel.findByIdAndDelete(id);
      await this.caseModel.deleteMany({ location: id });
      return location;
    } catch (e) {
      return null;
    }
  }

  async addUserToLocation(id: string, userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) return 'no_user';
    try {
      return await this.locationModel
        .findByIdAndUpdate(
          id,
          {
            $addToSet: {
              members: [userId],
            },
          },
          { new: true },
        )
        .populate('members');
    } catch (e) {
      return null;
    }
  }

  async removeUserFromLocation(id: string, userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) return 'no_user';
    try {
      return await this.locationModel
        .findByIdAndUpdate(
          id,
          {
            $pullAll: {
              members: [userId],
            },
          },
          { new: true },
        )
        .populate('members');
    } catch (e) {
      return null;
    }
  }
}
