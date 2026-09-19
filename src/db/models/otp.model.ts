import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { OtpTypeEnum } from "src/common";
import { emailEventEmitter } from "src/common/utils/event/email.event";
import { hash } from "src/common/utils/security/hash.utils";
import { boolean, string } from "zod";

@Schema({
    timestamps:true ,
})

export class Otp{
    @Prop({
        type:String,
        required:true
    })
    code:string

    @Prop({
        type:Date,
        required:true
    })
    expiredAt:Date

    @Prop({
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    })
    createdBy:Types.ObjectId

    @Prop({
        type:String,
        required:true,
        enum:OtpTypeEnum,
    })
    type:string    
   
}
export const otpSchema = SchemaFactory.createForClass(Otp)
otpSchema.index({expiredAt:1},{expireAfterSeconds:0}) //TTL
otpSchema.pre('save',async function(this:OtpDocument & {wasNew:boolean , plainOtp:string}){
    this.wasNew = this.isNew
    if(this.isModified("code")){
        this.plainOtp = this.code
        this.code = await hash({plainText:this.code})
        await this.populate("createdBy");
    }
})

otpSchema.post('save',async function(doc:OtpDocument){
    const that = this as OtpDocument & { wasNew: boolean; plainOtp: string };
    if(that.wasNew && that.plainOtp){
        await emailEventEmitter.emit(OtpTypeEnum.CONFIRM_EMAIL, { to: (that.createdBy as any).email, otp: that.plainOtp, username: (that.createdBy as any).username });
    }
})
export type OtpDocument = HydratedDocument<Otp>;
export const OtpModel = MongooseModule.forFeature([
    {name:Otp.name , schema:otpSchema}
])