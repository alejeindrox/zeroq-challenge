import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is Alive!';
  }

  getUserIsAuthenticated(): string {
    return 'congratulation you are Authenticated!';
  }
}
