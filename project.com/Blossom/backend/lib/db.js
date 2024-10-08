import mongoose from "mongoose";

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to mongo db...");
  } catch (error) {
    console.log("Error Connecting to mongo db...", error);
  }
};
