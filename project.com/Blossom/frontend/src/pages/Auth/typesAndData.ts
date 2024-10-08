import { z } from "zod";

/**
 * Sign In Schema
 */
export const signInZodSchema = z.object({
  email: z.string().email().trim().min(1, { message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type SignInSchemaType = z.infer<typeof signInZodSchema>;

/**
 * Sign Up Schema
 */
export const signUpZodSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().email().trim().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters" })
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
        ),
        {
          message:
            "Password should contain atleast 1 upper case letter, a number and a special character",
        }
      ),
    confirmPassword: z.string(),
    isVendor: z.boolean().optional(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "Mismatch in password",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpZodSchema>;

/**
 * Signed In User Session Type
 */
export type UserSessionType = {
  _id: string;
  name: string;
  email: string;
  isVendor: boolean;
};
