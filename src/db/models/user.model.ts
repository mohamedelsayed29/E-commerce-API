import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
// import { hash } from "node_modules/zod/v4/mini/external.cjs";
import { GenderEnum, ProviderEnum } from "src/common/enums/user.enum";

@Schema({
    timestamps:true ,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

export class User{
    @Prop({
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:10
    })
    firstName : string;
    @Prop({
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:10
    })
    lastName : string;

    @Virtual({
        get:function(this:User){
            return this.firstName + " " +this.lastName
        },
        set: function (this: UserDocument, value: string) {
            const [firstName, lastName] = value.split(" ");
            this.set({ firstName, lastName });
        }
    })
    username:string;

    @Prop({
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    })
    email:string

    @Prop({
        type:Date
    })
    confirmEmail:Date

    @Prop({
        type:String
    })
    confirmEmailOTP:string

    @Prop({
        type:String,
        required:function(this:User){
            return this.provider === ProviderEnum.GOOGLE ? false : true
        }
    })
    password:string

    @Prop({
        type:String,
        enum:{
            values:Object.values(ProviderEnum),
            message:"{Value} is not valid provider"
        },
        default:ProviderEnum.SYSTEM
    })
    provider:string

    @Prop({
        type:String,
        required:true,
        enum:{
            values:Object.values(GenderEnum),
            message:"{Value} is not valid gender"
        },
    })
    gender:string

    @Prop({
        type:String,
    })
    phone:string
}
export const userSchema = SchemaFactory.createForClass(User)
// userSchema.pre("save" , async function(next){
//     if(this.isModified("password")){
//         this.password = await hash({plainText:this.password})
//     }
//     next()
// })
export type UserDocument = HydratedDocument<User>;
export const UserModel = MongooseModule.forFeature([
    {name:User.name , schema:userSchema}
])