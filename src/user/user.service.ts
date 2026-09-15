import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    getProfile(): string{
        return "User profile data";
    }
}