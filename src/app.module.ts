import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesModule } from './cases/cases.module';
import { TargetsModule } from './targets/targets.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AttachmentsModule } from './attachments/attachments.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost/mat-app',
    ),
    MulterModule.register({ dest: join(process.cwd(), 'temp') }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    AuthModule,
    CasesModule,
    TargetsModule,
    LocationsModule,
    UsersModule,
    //AttachmentsModule,
  ],
})
export class AppModule {}
