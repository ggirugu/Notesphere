import { Router } from "express";
import { ZodError } from "zod";
import UserModel, {
  validateSignInRequest,
  validateSignUpRequest,
} from "../models/UserModel.js";

const userRouter = Router();

/**
 * Login API
 */
userRouter.post("/login", async (req, res) => {
  try {
    const clientReq = validateSignInRequest(req.body);

    const { email, password } = clientReq;

    const existingUser = await UserModel.findOne({
      email,

    });

    if (!existingUser) {
      return res.status(404).send("User not found.");
    }

    if (!existingUser.comparePassword(password)) {
      return res.status(400).send("Invalid Email / Password");
    }

    return res.send(existingUser.generateJWTToken());
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error.issues[0].message);
    }
    console.log(error);
    return res.status(500).send("Unknown error occured!!");
  }
});

/**
 * Sign up API
 */
userRouter.post("/sign-up", async (req, res) => {
  try {
    const clientReq = validateSignUpRequest(req.body);

    const { email } = clientReq;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const newUser = new UserModel(clientReq);

    await newUser.save();

    return res.send(newUser.generateJWTToken());
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error.issues[0].message);
    }
    console.log(error);
    return res.status(500).send("Unknown error occured!!");
  }
});

userRouter.get("/vendors", async (req, res) => {
  try {
    const vendors = await UserModel.find({ isVendor: true });
    return res.json(vendors);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

export default userRouter;
