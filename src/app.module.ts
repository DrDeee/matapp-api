import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { TargetsModule } from './targets/targets.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://localhost/mat-app',
    ),
    EventEmitterModule.forRoot(),
    AuthModule,
    CasesModule,
    TargetsModule,
    LocationsModule,
    UsersModule,
  ],
})
export class AppModule {}
