import { Router } from "express";
import { ZodError } from "zod";
import NoteModel from "../models/NoteModel.js";
import CategoryModel from "../models/CategoryModel.js";
import { validateNoteSchema } from "../models/NoteModel.js"; // Correct import
import { validateCategorySchema } from "../models/CategoryModel.js"; // Correct import

const notesRouter = Router();

/**
 * Get all notes for a user
 */
notesRouter.get("/notes/:userId", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.params.userId });
    return res.json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching notes.");
  }
});

/**
 * Create or update a note
 */
notesRouter.post("/notes", async (req, res) => {
  try {
    // Validate the request body using Zod schema
    const noteData = validateNoteSchema.parse(req.body); // Using .parse() to validate

    const existingNote = await NoteModel.findById(noteData._id);
    if (existingNote) {
      // Update note
      Object.assign(existingNote, noteData);
      await existingNote.save();
      return res.json(existingNote);
    } else {
      // Create new note
      const newNote = new NoteModel(noteData);
      await newNote.save();
      return res.json(newNote);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      // Return detailed validation error
      return res.status(400).send(error.issues[0].message);
    }
    console.error(error);
    return res.status(500).send("Error creating/updating note.");
  }
});
/**
 * Update an existing note
 */
notesRouter.put("/notes/:noteId", async (req, res) => {
  try {
    // Validate the request body using Zod schema
    const noteData = validateNoteSchema.parse(req.body); // Using .parse() to validate

    // Find the note by its ID and update it
    const updatedNote = await NoteModel.findByIdAndUpdate(
      req.params.noteId,
      noteData,  // Update the note with the new data
      { new: true, runValidators: true }  // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).send("Note not found.");
    }

    return res.json(updatedNote);
  } catch (error) {
    if (error instanceof ZodError) {
      // Return detailed validation error
      return res.status(400).send(error.issues[0].message);
    }
    console.error(error);
    return res.status(500).send("Error updating note.");
  }
});


/**
 * Delete a note
 */
notesRouter.delete("/notes/:noteId", async (req, res) => {
  try {
    const note = await NoteModel.findByIdAndDelete(req.params.noteId);
    if (!note) return res.status(404).send("Note not found.");
    return res.json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting note.");
  }
});

/**
 * Fetch all categories for the user
 */
notesRouter.get("/categories/:userId", async (req, res) => {
  try {
    const categories = await CategoryModel.find({ userId: req.params.userId });
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching categories.");
  }
});

/**
 * Create new category
 */
notesRouter.post("/categories", async (req, res) => {
  try {
    // Validate the request body using Zod schema
    const categoryData = validateCategorySchema.parse(req.body); // Using .parse() to validate

    const newCategory = new CategoryModel(categoryData);
    await newCategory.save();
    return res.json(newCategory);
  } catch (error) {
    if (error instanceof ZodError) {
      // Return detailed validation error
      return res.status(400).send(error.issues[0].message);
    }
    console.error(error);
    return res.status(500).send("Error creating category.");
  }
});

export default notesRouter;
