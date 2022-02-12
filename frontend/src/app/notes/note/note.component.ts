import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';

import { NotesService } from '../notes.service';
import { Note } from 'src/app/notes/shared/note.model';
import { RenameNoteDialogComponent } from 'src/app/notes/rename-note-dialog/rename-note-dialog.component';
import { DeleteNoteDialogComponent } from 'src/app/notes/delete-note-dialog/delete-note-dialog.component';


export enum NoteChangeEvent {
  UpdateName,
  Delete,
}

enum NoteViewType {
  ViewOnly,
  ViewAndEdit,
  EditOnly,
}

@Component({
  selector: 'notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy, OnChanges {
  readonly NoteViewType = NoteViewType;

  @Input() note: Note | null = null;
  // Fired when a note name is renamed or a note is deleted
  @Output() noteChangedEvent = new EventEmitter<NoteChangeEvent>();

  currentViewType: NoteViewType = NoteViewType.ViewOnly;
  previousText = '';
  model = {
    name: '',
    text: ''
  };
  editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  };

  autoSaveInterval = setInterval(async () => {
    if (this.note) {
      const didSave = await this.saveNoteText(this.note);
      if (didSave) console.log('Auto-saved note at ' + new Date().toLocaleTimeString());
    }
  }, 5000);

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private notesService: NotesService
  ) {
  }

  async ngOnInit() {
    await this.setNoteModel();
  }

  async ngOnDestroy() {
    clearInterval(this.autoSaveInterval);
  }

  async ngOnChanges(changes: SimpleChanges) {
    const prevNote = changes['note'].previousValue as Note | undefined;
    if (prevNote) {
      const didSave = await this.saveNoteText(prevNote);
      if (didSave) console.log('Changing notes, saved previous note at ' + new Date().toLocaleTimeString());
    }
    await this.setNoteModel();
  }

  async setNoteModel() {
    if (this.note) {
      this.model.text = this.note.text;
      this.model.name = this.note.name;
      this.previousText = this.note.text;
    }
  }

  /**
   * Saves the changes of a note's text to the database, if it changed.
   * @param note The note to save.
   * @returns Whether or not the note saved.
   */
  async saveNoteText(note: Note) {
    const newText = this.model.text;
    if (newText !== this.previousText) {
      await this.notesService.updateNote({
        ...note,
        text: newText
      });
      this.previousText = newText;
      return true;
    } else {
      return false;
    }
  }

  renameNote() {
    const renameDialogRef = this.dialog.open(RenameNoteDialogComponent, {
      data: {
        originalNoteName: this.model.name
      }
    });

    renameDialogRef.afterClosed().subscribe(async (newName) => {
      if (this.note !== null && newName && newName !== this.note.name) {
        await this.notesService.updateNote({
          ...this.note,
          name: newName
        });
        this.model.name = newName;
        this.noteChangedEvent.emit(NoteChangeEvent.UpdateName);
      }
    });
  }

  downloadNote() {
    saveAs(
      new Blob(
        [this.model.text],
        { type: 'text/markdown' }),
      this.model.name + '.md'
    );
  }

  deleteNote() {
    const deleteDialogRef = this.dialog.open(DeleteNoteDialogComponent, {
      data: { noteName: this.model.name }
    });

    deleteDialogRef.afterClosed().subscribe(async (result) => {
      if (result && this.note !== null) {
        await this.notesService.deleteNote(this.note?.id);
        this.snackBar.open('The note has been deleted.', 'Dismiss', {
          duration: 3000
        });
        this.noteChangedEvent.emit(NoteChangeEvent.Delete);
      }
    });
  }
}
