import {
  Inject,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Cache) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];

    const storedToken = await this.redisClient.get(
      `active_token:${user.email}`,
    );

    if (storedToken && storedToken === token) {
      return true;
    }
    throw new UnauthorizedException('Old token cannot be used.');
  }
}
