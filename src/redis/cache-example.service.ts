import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheExampleService {
  constructor(private redisService: RedisService) {}

  /**
   * Example 1: Simple caching with TTL
   */
  async getUserData(userId: string) {
    const cacheKey = `user:${userId}`;

    // Try cache first
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Simulate database call
    const userData = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
    };

    // Cache for 1 hour (3600 seconds)
    await this.redisService.set(cacheKey, userData, 3600);

    return userData;
  }

  /**
   * Example 2: Using cacheResult helper
   */
  async getExpensiveCalculation(params: any) {
    const cacheKey = `calculation:${JSON.stringify(params)}`;

    return this.redisService.cacheResult(
      cacheKey,
      async () => {
        // Simulate expensive calculation
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { result: Math.random() * 1000 };
      },
      1800, // Cache for 30 minutes
    );
  }

  /**
   * Example 3: Paginated results caching
   */
  async getPaginatedExpanses(userId: string, page: number, limit: number) {
    const baseKey = `expanses:${userId}`;

    return this.redisService.cachePaginatedResult(
      baseKey,
      page,
      limit,
      async () => {
        // Simulate database query
        return {
          data: Array.from({ length: limit }, (_, i) => ({
            id: page * limit + i,
            name: `Expense ${page * limit + i}`,
          })),
          total: 100,
          page,
          limit,
        };
      },
      600, // Cache for 10 minutes
    );
  }

  /**
   * Example 4: Cache invalidation
   */
  async invalidateUserCache(userId: string) {
    await this.redisService.del(`user:${userId}`);
    await this.redisService.del(`expanses:${userId}`);
  }

  /**
   * Example 5: Cache with prefix
   */
  async cacheUserSession(userId: string, sessionData: any) {
    await this.redisService.setWithPrefix(
      'session',
      userId,
      sessionData,
      86400,
    ); // 24 hours
  }

  async getUserSession(userId: string) {
    return this.redisService.getWithPrefix('session', userId);
  }
}
