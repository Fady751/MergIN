import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './UsersModule/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LinkModule } from './link/link.module';
import { SkillModule } from './skill/skill.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const uri = configService.get<string>('MONGODB_URI');
    //     if (!uri) {
    //       throw new Error('MONGODB_URI is not defined in environment variables');
    //     }
    //     console.log("\t\t\t"+uri)
    //     return { uri };
    //   },
    //   inject: [ConfigService],
    // }),
     GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generates schema
      playground: true, // Enables the interactive playground,
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    UserModule,
    LinkModule,
    SkillModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
