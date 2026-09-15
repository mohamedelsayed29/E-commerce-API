import { Body, Controller, Get, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type{ Request, Response } from 'express';

@Controller('auth/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
   signup(@Body() body: any) {
    return this.authService.signUp(body);
  }

}
