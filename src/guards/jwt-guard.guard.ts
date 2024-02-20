import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private redisClient: Cache;

  constructor() {}

  setRedisClient(redisClient: Cache) {
    this.redisClient = redisClient;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const storedOldToken = await this.redisClient.get(
      `old_token:${request.user.email}`,
    );

    if (
      storedOldToken &&
      storedOldToken === request.headers.authorization.split(' ')[1]
    ) {
      throw new UnauthorizedException('Old token cannot be used.');
    }

    return true;
  }
}
