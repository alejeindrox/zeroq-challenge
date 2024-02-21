import { JwtAuthGuard } from './jwt-guard.guard';
import { Cache } from 'cache-manager';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    const mockRedisClient: Cache = {} as Cache;
    expect(new JwtAuthGuard(mockRedisClient)).toBeDefined();
  });
});
