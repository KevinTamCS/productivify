import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-rename-note-dialog',
  templateUrl: './rename-note-dialog.component.html'
})
export class RenameNoteDialogComponent {
  model = {
    newNoteName: this.data.originalNoteName
  };

  constructor(
    public dialogRef: MatDialogRef<RenameNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { originalNoteName: string }
  ) {
  }

  submitRenameForm(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.model.newNoteName);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
