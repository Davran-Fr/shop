import { z } from "zod";

export const profileForm = z.object({
  name: z.string().min(2).optional().or(z.literal("")),
  email: z.email({ message: "Please enter your E-mail" }).trim().optional().or(z.literal("")),
  password: z
    .string()
    .min(4, { message: "You need at least 8 symbols" })
    .regex(/[a-zA-Z]/, { message: "Password need to contain a letter" })
    .regex(/[0-9]/, { message: "Password need to contain a number" })
    .optional()
    .or(z.literal("")),
  avatar: z.string().optional().or(z.literal("")),
});

export type ProfileUpdateType = z.infer<typeof profileForm>;
