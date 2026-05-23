import { Controller, Get, Post, Body, Res, UseGuards, Query, Param, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-user-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { GetUser } from './decorators';
import { User } from './entities/user.entity';
import { type Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { UpdateAuthDto } from './dto/update-user-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async createUser(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    const { token, ...user } = await this.authService.create(createAuthDto)

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.STAGE === 'prod',
      sameSite: 'lax',
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    return {
      ...user,
      token,
    };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { token, ...user } = await this.authService.login(loginUserDto)

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.STAGE === 'prod',
      sameSite: 'lax',
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    return {
      ...user,
      token,
    };
  }

  @Get('check-status')
  @UseGuards(AuthGuard())
  async checkAuthStatus(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, ...userToReturn } = await this.authService.checkAuthStatus(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.STAGE === 'prod',
      sameSite: 'lax',
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    return {
      ...userToReturn,
      token,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Sesión cerrada correctamente' };
  }

  @Get('user')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Get('user/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch('user/:id')
  update(@Param('id', ParseUUIDPipe) id: string, updateAuthDto: UpdateAuthDto) {
    this.authService.update(id, updateAuthDto);
  }

  @Delete('user/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.authService.remove(id);
  }

}
