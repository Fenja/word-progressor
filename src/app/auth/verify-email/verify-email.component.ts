import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { TranslationService } from "../../translation/translation.service";

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent {

  constructor(
    public authService: AuthService,
    public translationService: TranslationService,
  ) {
  }

}
