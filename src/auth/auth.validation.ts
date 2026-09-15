// import z from "zod";

// export const signUpValidation = z.strictObject({
//     username:z.string().min(3, "Username must be at least 3 characters long"),
//     email:z.email("Invalid email address"),
//     password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
//     confirmPassword:z.string().min(6, "Confirm Password must be at least 6 characters long").superRefine((data, ctx) => {
//         if (data.confirmPassword !== data.password) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.custom,
//                 message: "Passwords do not match",

//             });
//         }
//     })
// })