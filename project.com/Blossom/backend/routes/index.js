
import userRouter from "./userRoutes.js";


export const initializeRoutes = (app) => {
  app.use("/api/auth", userRouter);

};
