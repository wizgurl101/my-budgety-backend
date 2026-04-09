import { Controller, Delete } from '@nestjs/common';
import { CacheManagerService } from './cacheManager.service';

@Controller('cacheManager')
export class CacheManagerController {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  @Delete()
  async clearCache() {
    await this.cacheManagerService.clearCache();
  }
}
