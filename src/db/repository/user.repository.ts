import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../models/user.model";
import { DatabaseRepository } from "./database.repository";

@Injectable()
export class UserRepository extends DatabaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) protected readonly model: Model<UserDocument>) {
        super(model)
    }
}
