import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
    constructor(){}
    
    generatehash = async({plainText, saltRounds = Number(process.env.HASH_SALT)}: {plainText: string, saltRounds?: number}):Promise<string> => {
        const hashedText = await bcrypt.hash(plainText, saltRounds);
        return hashedText;
    }
    
    compareHash = async({plainText, hashedText}: {plainText: string, hashedText: string}): Promise<boolean> => {
        const isMatch = await bcrypt.compare(plainText, hashedText);
        return isMatch;
    }
}