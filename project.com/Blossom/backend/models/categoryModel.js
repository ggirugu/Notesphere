import mongoose, { Schema } from "mongoose";
import z from "zod";

// Mongoose schema for Categories
const CategorySchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true }, // Foreign key to User
});

const CategoryModel = mongoose.model("Category", CategorySchema);

// Zod schema for Category validation
export const validateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required."),
  userId: z.string().min(1, "User ID is required."),
});

export default CategoryModel;
