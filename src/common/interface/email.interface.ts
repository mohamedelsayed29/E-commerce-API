import { Mail } from "nodemailer";

export interface IEmail extends Mail.Options {
    otp:number
}