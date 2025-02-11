import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':method')
  create(@Body() createAuthDto: CreateAuthDto,@Param() params: any) {
    const availableMethods = ['register', 'login', 'logout', 'refresh'];

    if (!availableMethods.includes(params.method))
      throw new HttpException('Invalid method', HttpStatus.BAD_REQUEST);

    if (!createAuthDto.password || !createAuthDto.email)
      throw new HttpException('Missing credentials', HttpStatus.BAD_REQUEST);

    if ( createAuthDto.password.length < 6 || createAuthDto.password.length > 20 )
      throw new HttpException('Invalid credentials (password must me between 6 and 20 char length)', HttpStatus.BAD_REQUEST)

    return this.authService.create(createAuthDto, params.method);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
