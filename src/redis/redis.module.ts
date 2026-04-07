import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { HealthController } from './health.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: parseInt(process.env.REDIS_DB) || 0,
      ttl: 600, // default TTL in seconds (10 minutes)
    }),
  ],
  controllers: [HealthController],
  providers: [RedisService],
  exports: [RedisService, CacheModule],
})
export class RedisModule {}
