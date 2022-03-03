import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TargetDocument } from 'src/schemas/target.schema';
import { InjectModel } from '@nestjs/mongoose/dist';
import { CreateTargetDto, UpdateTargetDto } from 'src/dtos/targets.dtos';
import { phone } from 'phone';
import { CaseDocument } from 'src/schemas/case.schema';

@Injectable()
export class TargetsService {
  constructor(
    @InjectModel('Target') private readonly targetModel: Model<TargetDocument>,
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
  ) {}

  async getAllTargets() {
    return await this.targetModel.find({});
  }

  async createNewTarget(newTarget: CreateTargetDto) {
    if (newTarget.phoneNumber)
      newTarget.phoneNumber = phone(newTarget.phoneNumber, {
        country: 'DE',
      }).phoneNumber;
    const target = new this.targetModel(newTarget);
    return await target.save();
  }

  async getTargetById(id: string) {
    try {
      return await this.targetModel.findById(id);
    } catch (e) {
      return null;
    }
  }

  async updateTargetById(id: string, updates: UpdateTargetDto) {
    if (updates.phoneNumber)
      updates.phoneNumber = phone(updates.phoneNumber, {
        country: 'DE',
      }).phoneNumber;
    try {
      return await this.targetModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
    } catch (e) {
      return null;
    }
  }

  async deleteTargetById(id: string) {
    try {
      const target = await this.targetModel.findByIdAndDelete(id);
      await this.caseModel.deleteMany({
        target: id,
      });
      return target;
    } catch (e) {
      return null;
    }
  }

  async addNoteToTarget(id: string, note: string) {
    try {
      const target = await this.targetModel.findById(id);
      if (!target) return null;
      target.notes.push(note);
      return await target.save();
    } catch (e) {
      return null;
    }
  }

  async removeNoteFromTarget(id: string, noteIndex: number) {
    try {
      const target = await this.targetModel.findById(id);
      if (!target) return null;
      if (target.notes[noteIndex]) {
        target.notes.splice(noteIndex, 1);
      }
      return await target.save();
    } catch (e) {
      return null;
    }
  }
}
