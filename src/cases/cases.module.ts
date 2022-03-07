import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseSchema } from 'src/schemas/case.schema';
import { UsersModule } from 'src/users/users.module';
import { TargetsModule } from 'src/targets/targets.module';
import { LocationsModule } from 'src/locations/locations.module';
import { AttachmentSchema } from 'src/schemas/attatchment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Case', schema: CaseSchema },
      { name: 'Attachment', schema: AttachmentSchema },
    ]),
    UsersModule,
    TargetsModule,
    LocationsModule,
  ],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}
