import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-note-dialog',
  templateUrl: './delete-note-dialog.component.html'
})
export class DeleteNoteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      noteName: string
    }
  ) {
  }
}
