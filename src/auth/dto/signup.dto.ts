import { GenderEnum, ProviderEnum, UserRoleEnum } from "src/common/enums/user.enum";
import z from "zod";

export const signUpSchemaDTO = z.strictObject({
    firstName:z.string().min(2).max(15),
    lastName:z.string().min(2).max(15),
    username:z.string().min(2).max(15),
    email:z.email(),
    password:z.string(),
    confirmPassword:z.string(),
    role:z.enum(UserRoleEnum).optional().default(UserRoleEnum.USER),
    gender:z.enum(GenderEnum),
    provider:z.enum(ProviderEnum).optional().default(ProviderEnum.SYSTEM),
    phone:z.string().refine(
        (val)=>{
            const phoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;
            return phoneRegex.test(val)
        },{message:"Invalid Egyptian phone number"}
    )

}).refine((data) => data.password !== data .confirmPassword,{
    message:'Password and confirm Password is not Matched',
    path:['confirmPassword']
}
)
export type SignUpDTO = z.infer<typeof signUpSchemaDTO>