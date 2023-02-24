import { TaskService } from './task.service';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
@Module({
    imports: [        
        CacheModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          store: redisStore,
          host: configService.get('REDIS_HOSTNAME'),
          port: configService.get('REDIS_PORT'),
        }),
        inject: [ConfigService],
      }),],
    controllers: [],
    providers: [TaskService,],
    exports: [TaskService],
})
export class TaskModule { }
