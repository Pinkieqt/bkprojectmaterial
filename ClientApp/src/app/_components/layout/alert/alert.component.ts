import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent
{
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,)
  {
  }

  onCloseClick()
  {
    this.dialogRef.close();
  }

}
