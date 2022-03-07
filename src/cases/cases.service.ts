import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CaseDocument } from 'src/schemas/case.schema';
import { CreateCaseDto, UpdateCaseDto } from 'src/dtos/cases.dtos';
import { UsersService } from 'src/users/users.service';
import { TargetsService } from 'src/targets/targets.service';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
    private readonly usersService: UsersService,
    private readonly targetsService: TargetsService,
    private readonly locationsService: LocationsService,
  ) {}

  getModel() {
    return this.caseModel;
  }

  async getAllCases() {
    return await this.caseModel
      .find({})
      .populate('target')
      .populate('attachments');
  }

  async createCase(data: CreateCaseDto) {
    if (!(await this.targetsService.getTargetById(data.target)))
      throw 'Target not found.';
    if (!(await this.locationsService.getLocationById(data.location)))
      throw 'Location not found.';
    if (!(await this.usersService.getUserById(data.annunciator)))
      throw 'Annunciator not found.';
    if (!(await this.usersService.getUserById(data.executor)))
      throw 'Executor not found.';
    return await (
      await (await new this.caseModel(data).save()).populate('target')
    ).populate('attachments');
  }

  async getCaseById(id: string, full = false) {
    try {
      const request = await this.caseModel
        .findById(id)
        .populate('target')
        .populate('attachments');
      if (full)
        (
          await (
            await (await request).populate('location')
          ).populate('annunciator')
        ).populate('executor');
      return request;
    } catch (e) {
      return null;
    }
  }

  async updateCaseById(id: string, data: UpdateCaseDto) {
    if (data.target && !(await this.targetsService.getTargetById(data.target)))
      throw 'Target not found.';
    if (
      data.location &&
      !(await this.locationsService.getLocationById(data.location))
    )
      throw 'Location not found.';
    if (
      data.annunciator &&
      !(await this.usersService.getUserById(data.annunciator))
    )
      throw 'Annunciator not found.';
    if (data.executor && !(await this.usersService.getUserById(data.executor)))
      throw 'Executor not found.';
    try {
      return await this.caseModel
        .findByIdAndUpdate(id, data, { new: true })
        .populate('target')
        .populate('attachments');
    } catch (e) {
      return null;
    }
  }

  async deleteCaseById(id: string) {
    try {
      return await this.caseModel.findByIdAndDelete(id);
    } catch (e) {
      return null;
    }
  }
}
