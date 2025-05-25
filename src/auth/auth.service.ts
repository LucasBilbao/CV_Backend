import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthUserDto } from './dtos/authUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async authenticate(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);

    if (!user) {
      return new UnauthorizedException();
    }

    return this.signIn(user);
  }

  public async validateUser(
    userDto: AuthUserDto,
  ): Promise<{ id: string; username: string } | null> {
    const user = await this.userService.findUserByEmail(userDto.email);

    if (!user || user.password !== userDto.password) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  }

  private async signIn(user: {
    id: string;
    username: string;
  }): Promise<{ accessToken: string; id: string; username: string }> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      id: user.id,
      username: user.username,
    };
  }
}
