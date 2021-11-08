import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordDialog {

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialog>,
    private authService: AuthService,
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  sendNewPasswordTo(email: string) {
    this.authService.ForgotPassword(email).then();
    this.dialogRef.close();
  }
}
