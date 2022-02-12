import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { NotesService } from './notes.service';
import { Note } from 'src/app/notes/shared/note.model';
import { NoteChangeEvent } from 'src/app/notes/note/note.component';


@Component({
  selector: 'notes-main',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  currentNote: Note | null = null;

  constructor(
    private notesService: NotesService
  ) {
  }

  async ngOnInit() {
    await this.fetchNotes();
    this.currentNote = this.notes[0];
  }

  async fetchNotes() {
    // TODO: Implement infinite scroll note loading
    this.notes = await this.notesService.getNotes(undefined, 100);
  }

  async onNoteSwitched(event: MatSelectionListChange) {
    const newNoteId = event.options[0].value;
    const foundNote = await this.notesService.getNote(newNoteId);
    if (foundNote) {
      this.currentNote = foundNote;
    }
  }

  async addNote() {
    this.currentNote = await this.notesService.addNote({
      name: 'New Note',
      text: `# My New Note\n## Created on ${new Date().toLocaleString()}\n\n`
    });

    await this.fetchNotes();
  }

  async onNoteChanged(event: NoteChangeEvent) {
    await this.fetchNotes();

    if (event === NoteChangeEvent.Delete) {
      if (this.notes.length > 0) {
        this.currentNote = this.notes[0];
      } else {
        this.currentNote = null;
      }
    }
  }
}
