import { ConflictException, Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { SignUpDTO } from './dto/signup.dto';
import { hash } from 'src/common/utils/security/hash.utils';
import { OtpTypeEnum } from 'src/common';
import { OtpRepository, UserRepository } from 'src/db/repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository,
  ) {}

  async signUp(signUpSchemaDTO: SignUpDTO): Promise<string> {
    const { username, email, password, gender, phone, provider } = signUpSchemaDTO
    const checkUser = await this.userRepository.findOne({ filter: { email } })
    if (checkUser) throw new ConflictException('User Already Exist')
    const [user] = (await this.userRepository.create({
      data: [{ username, email, password: await hash({ plainText: password }), gender, phone, provider }],
    })) || []
    // otp post-save hook hashes the code and sends the confirmation email
    await this.otpRepository.create({
      data: [{
        createdBy: user._id,
        code: String(randomInt(100000, 1000000)),
        expiredAt: new Date(Date.now() + 2 * 60 * 1000), // 2 min from now
        type: OtpTypeEnum.CONFIRM_EMAIL,
      }],
    })
    return 'User signed up successfully !';
  }
}
