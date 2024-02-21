import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseModuleMock } from '../database/database.module.mock';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.model';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleMock],
      controllers: [AuthController],
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        AuthService,
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
