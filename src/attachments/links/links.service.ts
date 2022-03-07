import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CasesService } from 'src/cases/cases.service';
import { LocationsService } from 'src/locations/locations.service';
import { TargetsService } from 'src/targets/targets.service';
import { AttachmentsService } from '../attachments.service';

@Injectable()
export class LinksService {
  constructor(
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService,
    private readonly casesService: CasesService,
    private readonly targetsService: TargetsService,
    private readonly locationsService: LocationsService,
  ) {}

  async unlinkAll(attachmentId: string) {
    await this.casesService.getModel().updateMany(
      {},
      {
        $pullAll: {
          attachments: [attachmentId],
        },
      },
    );
    await this.targetsService.getModel().updateMany(
      {},
      {
        $pullAll: {
          attachments: [attachmentId],
        },
      },
    );
    await this.locationsService.getModel().updateMany(
      {},
      {
        $pullAll: {
          attachments: [attachmentId],
        },
      },
    );
  }

  async linkAttachmentToCase(attachmentId: string, caseId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const c = await this.casesService.getCaseById(caseId);
    if (!c) throw 'Case not found.';
    await c.depopulate('attachments');

    return await this.casesService
      .getModel()
      .findByIdAndUpdate(
        caseId,
        {
          $addToSet: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('target')
      .populate('attachments');
  }

  async unlinkAttachmentFromCase(attachmentId: string, caseId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const c = await this.casesService.getCaseById(caseId);
    if (!c) throw 'Case not found.';
    await c.depopulate('attachments');
    return await this.casesService
      .getModel()
      .findByIdAndUpdate(
        caseId,
        {
          $pullAll: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('target')
      .populate('attachments');
  }

  async linkAttachmentToLocation(attachmentId: string, locationId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const l = await this.locationsService.getLocationById(locationId);
    if (!l) throw 'Location not found.';
    await l.depopulate('attachments');
    return await this.locationsService
      .getModel()
      .findByIdAndUpdate(
        locationId,
        {
          $addToSet: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('members')
      .populate('attachments');
  }

  async unlinkAttachmentFromLocation(attachmentId: string, locationId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const l = await this.locationsService.getLocationById(locationId);
    if (!l) throw 'Location not found.';
    await l.depopulate('attachments');
    return await this.locationsService
      .getModel()
      .findByIdAndUpdate(
        locationId,
        {
          $pullAll: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('members')
      .populate('attachments');
  }

  async linkAttachmentToTarget(attachmentId: string, targetId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const t = await this.targetsService.getTargetById(targetId);
    if (!t) throw 'Target not found.';
    await t.depopulate('attachments');

    return await this.targetsService
      .getModel()
      .findByIdAndUpdate(
        targetId,
        {
          $addToSet: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('attachments');
  }

  async unlinkAttachmentFromTarget(attachmentId: string, targetId: string) {
    const a = await this.attachmentsService.getAttachment(attachmentId);
    if (!a) throw 'Attachment not found.';
    const t: any = await this.targetsService.getTargetById(targetId);
    if (!t) throw 'Target not found.';
    await t.depopulate('attachments');
    return await this.targetsService
      .getModel()
      .findByIdAndUpdate(
        targetId,
        {
          $pullAll: {
            attachments: [attachmentId],
          },
        },
        { new: true },
      )
      .populate('attachments');
  }
}
