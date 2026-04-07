import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheService.get<T>(key);
  }

  /**
   * Set value in cache with optional TTL
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheService.set(key, value, ttl);
  }

  /**
   * Delete value from cache
   */
  async del(key: string): Promise<void> {
    await this.cacheService.del(key);
  }

  /**
   * Clear all cache (Note: This method availability depends on the cache store)
   */
  async reset(): Promise<void> {
    if (
      'reset' in this.cacheService &&
      typeof this.cacheService.reset === 'function'
    ) {
      await (this.cacheService as any).reset();
    }
  }

  /**
   * Get cache with prefix
   */
  async getWithPrefix<T>(prefix: string, key: string): Promise<T | undefined> {
    return await this.get<T>(`${prefix}:${key}`);
  }

  /**
   * Set cache with prefix
   */
  async setWithPrefix<T>(
    prefix: string,
    key: string,
    value: T,
    ttl?: number,
  ): Promise<void> {
    await this.set(`${prefix}:${key}`, value, ttl);
  }

  /**
   * Cache the result of a function
   */
  async cacheResult<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }

  /**
   * Cache paginated results
   */
  async cachePaginatedResult<T>(
    baseKey: string,
    page: number,
    limit: number,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const key = `${baseKey}:page:${page}:limit:${limit}`;
    return this.cacheResult(key, fn, ttl);
  }
}
