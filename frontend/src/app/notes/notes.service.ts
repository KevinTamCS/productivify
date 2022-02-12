import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { db } from 'src/app/db/db';
import { Note } from 'src/app/notes/shared/note.model';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  /**
   * Adds a new note to the database.
   *
   * @param note A note with only the name and text filled out.
   * @returns The newly created note, including its new ID.
   */
  async addNote(note: Omit<Note, 'id' | 'lastModified'>) {
    const newNote: Note = {
      ...note,
      id: uuid(),
      lastModified: new Date()
    };

    await db.notes.add(newNote);
    return newNote;
  }

  /**
   * Updates an existing note in the database.
   *
   * @param note The new note to update. The lastModified field will automatically be updated.
   */
  async updateNote(note: Note) {
    const updatedNote: Note = {
      ...note,
      lastModified: new Date()
    };

    await db.notes.update(note.id, updatedNote);
  }

  /**
   * Retrieves a list of notes from the database.
   * @param page The page number to retrieve.
   * @param count The number of notes to retrieve per page.
   * @returns A list of found notes.
   */
  async getNotes(page?: number, count?: number) {
    const limit = count ? count : 10;
    return db.notes
      .limit(limit)
      .offset(page ? page * limit : 0)
      .reverse()
      .sortBy('lastModified');
  }

  /**
   * Retrieves a specific note from the database.
   * @param id The id of the note to retrieve.
   * @returns The found note.
   */
  async getNote(id: string) {
    return db.notes
      .where('id').equals(id)
      .first();
  }

  /**
   * Deletes a specific note from the database.
   * @param id The id of the note to delete.
   */
  async deleteNote(id: string) {
    await db.notes
      .where('id').equals(id)
      .delete();
  }
}
