/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
// import { CoinPriceGateway } from './coin-price.gateway';
import * as redisStore from 'cache-manager-ioredis';

@Module({
    imports: [TaskModule,    
        CacheModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          store: redisStore,
          host: configService.get('REDIS_HOSTNAME'),
          port: configService.get('REDIS_PORT'),
        }),
        inject: [ConfigService],
      }),],
    exports: [
        // CoinPriceGateway
    ],
    providers: [
        // CoinPriceGateway
    ],
})
export class EventModule { }
