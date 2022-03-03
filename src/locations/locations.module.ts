import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationSchema } from 'src/schemas/location.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { CaseSchema } from 'src/schemas/case.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Location', schema: LocationSchema },
      { name: 'Case', schema: CaseSchema },
    ]),
    UsersModule,
  ],
  providers: [LocationsService],
  controllers: [LocationsController],
  exports: [LocationsService],
})
export class LocationsModule {}
