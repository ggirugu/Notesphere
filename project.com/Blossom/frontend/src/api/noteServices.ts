import { http } from "@/lib/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Note } from "@/types/note";

/**
 * Fetch all notes for a user
 * @param userId - The ID of the user
 * @returns Notes array
 */
const fetchNotes = async (userId: string): Promise<Note[]> => {
  const res = await http.get(`/notes/${userId}`);
  console.log(res);
  return res.data;
};

/**
 * React Query hook to fetch notes
 * @param userId - The ID of the user
 * @returns useQuery hook result
 */
export const useFetchNotesService = (userId: string) => {
  return useQuery({
    queryKey: ['notes', userId], // Cache key with userId
    queryFn: () => fetchNotes(userId), // Fetch function
    retry: 1, // Optional: retry once if the query fails
    refetchOnWindowFocus: false, // Optional: prevent refetch on window focus
  });
};

/**
 * Save a new note or update an existing one
 * @param noteData - The note data
 * @returns Saved or updated note
 */
const saveNoteService = async (noteData: Partial<Note>): Promise<Note> => {
  if (noteData._id) {
    const res = await http.put(`/notes/${noteData._id}`, noteData); // Update note
    return res.data;
  } else {
    const res = await http.post("/notes", noteData); // Create new note
    return res.data;
  }
};

/**
 * React Query hook to save (create or update) a note
 * @returns useMutation hook result
 */
export const useSaveNoteService = () => {
  return useMutation<Note, Error, Partial<Note>>({
    mutationFn: saveNoteService,
  });
};

/**
 * Delete a note by ID
 * @param noteId - The ID of the note to delete
 * @returns Deleted note
 */
const deleteNoteService = async (noteId: string): Promise<Note> => {
  const res = await http.delete(`/notes/${noteId}`);
  return res.data;
};

/**
 * React Query hook to delete a note
 * @returns useMutation hook result
 */
export const useDeleteNoteService = () => {
  return useMutation<Note, Error, string>({
    mutationFn: deleteNoteService,
  });
};
