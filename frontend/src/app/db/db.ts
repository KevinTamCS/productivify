import Dexie, { Table } from 'dexie';

import { Note } from 'src/app/notes/shared/note.model';


export class AppDB extends Dexie {
  notes!: Table<Note, string>;

  constructor() {
    super('productivify');
    this.version(3).stores({
      notes: '++id'
    });
  }
}

export const db = new AppDB();
