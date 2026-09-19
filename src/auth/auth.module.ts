import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from 'src/db/models/user.model';
import { SecurityService } from 'src/common';
import { OtpModel } from 'src/db/models/otp.model';
import { OtpRepository, UserRepository } from 'src/db/repository';

@Module({
  imports: [UserModel , OtpModel],
  controllers: [AuthController],
  providers: [AuthService , SecurityService , UserRepository , OtpRepository],
})
export class AuthModule {}
