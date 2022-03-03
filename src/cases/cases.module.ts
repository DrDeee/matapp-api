import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseSchema } from 'src/schemas/case.schema';
import { UsersModule } from 'src/users/users.module';
import { TargetsModule } from 'src/targets/targets.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Case', schema: CaseSchema }]),
    UsersModule,
    TargetsModule,
    LocationsModule,
  ],
  providers: [CasesService],
  controllers: [CasesController],
})
export class CasesModule {}
