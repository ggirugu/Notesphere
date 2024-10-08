import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import z from "zod";

export const UserMongooseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

});

/**
 * Sign Up Schema
 */
export const signUpZodSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password should be atleast 8 characters" })
    .regex(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
      ),
      {
        message:
          "Password should contain atleast 1 upper case letter, a number and a special character",
      }
    )

});

/**
 * Sign In Schema
 */
export const signInZodSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

// To save password in encrypted form before saving to database
UserMongooseSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

// To generate auth token
UserMongooseSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isVendor: this.isVendor,
    },
    process.env.JWT_PRIVATE_KEY
  );
};

// To validate auth token
UserMongooseSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("user", UserMongooseSchema);

export const validateSignUpRequest = (data) => {
  return signUpZodSchema.parse(data);
};

export const validateSignInRequest = (data) => {
  return signInZodSchema.parse(data);
};

export default UserModel;
