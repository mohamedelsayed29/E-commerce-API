import EventEmitter from "node:events";
import Mail from "nodemailer/lib/mailer";
import { sendEmail } from "../email/send.email";
import { verifyEmailTemplate } from "src/templates/verify.template.email";
import { IEmail } from "src/common/interface";
import { OtpTypeEnum } from "src/common/enums";

export const emailEventEmitter = new EventEmitter(); 

emailEventEmitter.on(OtpTypeEnum.CONFIRM_EMAIL, async(data:IEmail)=>{
    try {
        data.subject = OtpTypeEnum.CONFIRM_EMAIL;
        data.html = verifyEmailTemplate({otp:data.otp,title:"Email Confirmation"})
        await sendEmail(data);
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
}) ;
//resetPassword

emailEventEmitter.on(OtpTypeEnum.RESET_PASSWORD, async(data:IEmail)=>{
    try {
        data.subject = OtpTypeEnum.RESET_PASSWORD;
        data.html = verifyEmailTemplate({otp:data.otp,title:"Reset Password"})
        await sendEmail(data);
    } catch (error) {
        console.error("Error sending confirmation email:", error); 
    }
}) ;