import EventEmitter from "node:events";
import Mail from "nodemailer/lib/mailer";
import { sendEmail } from "../email/send.email";
import { verifyEmailTemplate } from "src/templates/verify.template.email";
import { EmailSubjectEnum } from "src/common/enums";

export const emailEventEmitter = new EventEmitter(); 
interface IEmail extends Mail.Options {
    otp:number
}
emailEventEmitter.on("confirmationEmail", async(data:IEmail)=>{
    try {
        data.subject = EmailSubjectEnum.CONFIRM_EMAIL;
        data.html = verifyEmailTemplate({otp:data.otp,title:"Email Confirmation"})
        await sendEmail(data);
    } catch (error) {
        console.error("Error sending confirmation email:", error);
    }
}) ;
//resetPassword

emailEventEmitter.on("resetPassword", async(data:IEmail)=>{
    try {
        data.subject = EmailSubjectEnum.RESET_PASSWORD;
        data.html = verifyEmailTemplate({otp:data.otp,title:"Reset Password"})
        await sendEmail(data);
    } catch (error) {
        console.error("Error sending confirmation email:", error); 
    }
}) ;