import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: {
        set: jest.fn(),
        get: jest.fn(),
        del: jest.fn(),
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class DatabaseModuleMock {}
