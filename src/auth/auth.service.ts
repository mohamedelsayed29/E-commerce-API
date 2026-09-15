import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/db/models/user.model';
import { Model } from 'mongoose';
import { SignUpDTO } from './dto/signup.dto';
import { hash } from 'src/common/utils/security/hash.utils';
import { emailEventEmitter } from 'src/common/utils/event/email.event';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}
  async signUp(signUpSchemaDTO: SignUpDTO): Promise<string> {
    const {username , email , password} = signUpSchemaDTO
    const checkUser = await this.userModel.findOne({email})
    if(checkUser) throw new ConflictException('User Already Exist')
    
    const [user] = (await this.userModel.create([{username , email , password : await hash({plainText: password})} ]) )||[]
    emailEventEmitter.emit("confirmationEmail",{to:email , otp:"12345" , username})
    return 'User signed up successfully !';
  }
}
