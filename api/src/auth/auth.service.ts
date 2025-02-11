import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  async create(createAuthDto: CreateAuthDto, method: string) {

    const unsecurePassword = createAuthDto.password;
    const saltRounds = Number(process.env.AUTH_SALT_ROUND);
    const hashedPassword = bcrypt.hash(unsecurePassword, saltRounds);

    switch (method) {
      case 'register':
        return {
          message: 'User registered successfully',
        };

      case 'login':
        return {
          message: 'User logged in successfully',
        };

      case 'logout':
        return {
          message: 'User logged out successfully',
        };
      case 'refresh':
        return {
          message: 'Token refreshed successfully',
        };
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
