import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { TranslationService } from "./translation/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = "WordProgressor";

  constructor(
    private swUpdate: SwUpdate,
    private translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm(this.translationService.translate('msg_update_available'))) {
          window.location.reload();
        }
      })
    }
  }
}
