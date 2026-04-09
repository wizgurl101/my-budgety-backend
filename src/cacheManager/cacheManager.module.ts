import { Module } from '@nestjs/common';
import { CacheManagerController } from './cacheManager.controller';
import { CacheManagerService } from './cacheManager.service';

@Module({
  controllers: [CacheManagerController],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
