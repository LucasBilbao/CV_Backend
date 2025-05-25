import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from './dtos/authUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() userDto: AuthUserDto) {
    return this.authService.authenticate(userDto);
  }
}
