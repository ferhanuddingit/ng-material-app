import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: [],
})
export class MatConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data,
    public _dialogRef: MatDialogRef<MatConfirmDialogComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this._dialogRef.close(false);
  }
}
