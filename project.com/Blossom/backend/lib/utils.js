import { ZodError } from "zod";

export const sendErrorResponse = (error, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send(error.issues[0].message);
  }
  console.log(error);
  return res.status(500).send("Something unexpected happened!!");
};
