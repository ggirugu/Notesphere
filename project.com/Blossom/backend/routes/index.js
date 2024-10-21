
import userRouter from "./userRoutes.js";
import notesRouter from "./noteRoute.js";


export const initializeRoutes = (app) => {
  app.use("/api/auth", userRouter);
  app.use("/api", notesRouter);

};


