import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseSchema } from 'src/schemas/case.schema';
import { TargetSchema } from 'src/schemas/target.schema';
import { TargetsController } from './targets.controller';
import { TargetsService } from './targets.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Target', schema: TargetSchema },
      { name: 'Case', schema: CaseSchema },
    ]),
  ],
  controllers: [TargetsController],
  providers: [TargetsService],
  exports: [TargetsService],
})
export class TargetsModule {}
