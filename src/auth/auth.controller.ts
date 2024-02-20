import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from '../guards/jwt-guard.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register User' })
  @ApiBody({ type: RegisterAuthDto })
  @Post('register')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    return this.authService.register(registerBody);
  }

  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ type: LoginAuthDto })
  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody);
  }

  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiBearerAuth()
  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshAccessToken(@Body('oldToken') oldToken: string) {
    return this.authService.refreshAccessToken(oldToken);
  }
}
