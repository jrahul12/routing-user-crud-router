import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  msg!: string
  constructor(private _ref: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: string
  ) { this.msg = data }

  ngOnInit(): void {
  }

  onClick(flag: boolean) {
    this._ref.close(flag)
  }

}
