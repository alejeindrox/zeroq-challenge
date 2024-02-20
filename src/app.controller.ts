import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('isAuthenticated')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserIsAuthenticated(): string {
    return this.appService.getUserIsAuthenticated();
  }
}
