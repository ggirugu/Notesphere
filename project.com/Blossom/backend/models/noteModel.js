import mongoose, { Schema } from "mongoose";
import z from "zod";

// Mongoose schema for Notes
const NoteSchema = new Schema({
  
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  userId: { type: String, required: true }, // Foreign key to User
  date: { type: Date, default: Date.now },
});

const NoteModel = mongoose.model("Note", NoteSchema);

// Zod schema for Note validation
export const validateNoteSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().max(500, "Content must be 500 characters or less."),
  category: z.string().min(1, "Category is required."),
  userId: z.string().min(1, "User ID is required."),
});

export default NoteModel;
