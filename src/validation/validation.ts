import { z } from "zod";

export const validForm = z
  .object({
    name: z.string().min(2),
    email: z.string().email({ message: "Please enter your E-mail" }).trim(),
    password: z
      .string()
      .min(4, { message: "You need at least 8 symbols" })
      .regex(/[a-zA-Z]/, {
        message: "Password need to contain  at least one letter ",
      })
      .regex(/[0-9]/, {
        message: "Password need to contain  at least one number",
      }),
      // .regex(/[^0-9a-zA-Z]/, {
      //   message: "Password need to contain  at least one symbol ",
      // }),
    confirmPassword: z.string().trim(),
    avatar: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shit confirm your password how could you forget the password",
        path: ["confirmPassword"],
      });
    }
  });

export type GetTypeValidForm = z.infer<typeof validForm>;
export type UpdatedType = Omit<GetTypeValidForm, "confirmPassword">;

export const logInForm = z.object({
  password: z.string({message: 'Please enter your password'}),
  email: z.string().email({message: 'Please enter your '}),
});
export type LoginType = z.infer<typeof logInForm>;
