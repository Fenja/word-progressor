import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-anonymous-dialog.component.ts',
  templateUrl: './anonymous-dialog.component.html'
})
export class AnonymousDialog {

  constructor(
    public dialogRef: MatDialogRef<AnonymousDialog>,
    private authService: AuthService,
    private router: Router,
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  proceed() {
    this.authService.isAnonymous = true;
    this.close();
    this.router.navigate(['/projects']).then();
  }
}
