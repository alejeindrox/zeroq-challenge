import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_DB),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: 'redis',
        host: 'redis',
        port: 6379,
        ttl: 1800000,
      }),
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: new Redis({
        host: 'redis',
        port: 6379,
      }),
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class DatabaseModule {}
