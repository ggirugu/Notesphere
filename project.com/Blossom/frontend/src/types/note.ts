// src/types/note.ts
export interface Note {
  _id: string;          // MongoDB ObjectId as a string
  title: string;
  content: string;
  category: string;
  userId: string;
  date: Date;
}

