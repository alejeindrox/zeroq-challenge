import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';

import { compareHash, generateHash } from './utils/handleBcrypt';
import { User, UserDocument } from '../schemas/user.model';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Cache,
  ) {}

  /**
   * Register a user
   * @param userBody
   * @returns
   */
  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;

    const userParse = {
      ...user,
      password: await generateHash(password),
    };

    const newUser = await this.userModel.create(userParse);

    return newUser;
  }

  /**
   * Login user
   * @param userLoginBody
   * @returns
   */
  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({
      email: userLoginBody.email,
    });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
    };

    const token = this.jwtService.sign(payload);

    await this.saveOldTokenInRedis(userExist.email, token);

    const data = {
      token,
      user: userFlat,
    };

    return data;
  }

  /**
   * Saving old token in Redis with expiration time
   * @param userEmail
   * @param token
   */
  private async saveOldTokenInRedis(userEmail: string, token: string) {
    const expirationTimeInSeconds = 1800;
    const redisKey = `old_token:${userEmail}`;

    await this.redisClient.set(redisKey, token, expirationTimeInSeconds);
  }

  /**
   * Refresh old token for a user
   * @param oldToken old Token of user
   * @returns
   */
  public async refreshAccessToken(oldToken: string) {
    const payload = this.jwtService.decode(oldToken) as { id: string };
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findById(payload.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newToken = this.jwtService.sign({ id: user._id });

    await this.saveOldTokenInRedis(user.email, oldToken);

    return { newToken };
  }
}
