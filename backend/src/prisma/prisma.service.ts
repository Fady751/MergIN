import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//   private readonly configService: ConfigService;
//   constructor(configService: ConfigService) {
//       const databaseUrl = configService.get<string>('DATABASE_URL') || undefined;
//       super({
//           log: ['query', 'info', 'warn', 'error'],
//       });
//       this.configService = configService;
//   }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
