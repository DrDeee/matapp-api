import { forwardRef, Module } from '@nestjs/common';
import { CasesModule } from 'src/cases/cases.module';
import { LocationsModule } from 'src/locations/locations.module';
import { TargetsModule } from 'src/targets/targets.module';
import { AttachmentsModule } from '../attachments.module';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [
    forwardRef(() => AttachmentsModule),
    CasesModule,
    TargetsModule,
    LocationsModule,
  ],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
