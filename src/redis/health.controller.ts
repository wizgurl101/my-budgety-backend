import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('health')
export class HealthController {
  constructor(private redisService: RedisService) {}

  @Get('redis')
  async checkRedisHealth() {
    try {
      // Test Redis connectivity
      const testKey = 'health-check';
      const testValue = 'ok';

      await this.redisService.set(testKey, testValue, 10);
      const retrievedValue = await this.redisService.get(testKey);

      if (retrievedValue === testValue) {
        return { status: 'healthy', message: 'Redis is working correctly' };
      } else {
        return { status: 'unhealthy', message: 'Redis value mismatch' };
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Redis connection failed',
        error: error.message,
      };
    }
  }
}
