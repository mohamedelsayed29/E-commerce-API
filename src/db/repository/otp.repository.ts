import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Otp, OtpDocument } from "../models/otp.model";
import { DatabaseRepository } from "./database.repository";

@Injectable()
export class OtpRepository extends DatabaseRepository<OtpDocument> {
    constructor(@InjectModel(Otp.name) protected readonly model: Model<OtpDocument>) {
        super(model)
    }
}
