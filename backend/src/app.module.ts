import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
