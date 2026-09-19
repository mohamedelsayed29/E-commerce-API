import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpSchemaDTO, type SignUpDTO } from './dto/signup.dto';
import { ZodValidationPipe } from 'src/common/pipes';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body(new ZodValidationPipe(signUpSchemaDTO)) body: SignUpDTO) {
    return this.authService.signUp(body);
  }

}
