import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUser } from "src/common";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ) {}
    // @Get('/profile') 
    // userProfile(): {
    //     const users : IUser[] = this.userService.getProfile()
    //     return {messsage: 'User profile data', users};
    // }
}