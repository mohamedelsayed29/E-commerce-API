import { BadRequestException } from "@nestjs/common";
import { createTransport, type Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async(data:Mail.Options):Promise<void>=>{
    if(!data.html && !data.attachments?.length && !data.text) throw new BadRequestException("missing email content");
    const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
    service: "gmail",
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string,
    },
    });
const info = await transporter.sendMail({
    ...data,
    from: `${process.env.APPLICATION_NAME} - <${process.env.EMAIL}>`, 

  });

  console.log("Message sent: %s", info.messageId); 
    
} 