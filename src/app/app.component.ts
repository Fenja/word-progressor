import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { TranslationService } from "./translation/translation.service";
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = "WordProgressor";
  isOffline: boolean = false;

  constructor(
    private swUpdate: SwUpdate,
    private translationService: TranslationService,
    private onlineStatusService: OnlineStatusService,
  ) {
    // https://medium.com/beingcoders/simple-way-to-fetch-the-internet-connection-status-for-your-angular-application-291d9ab34999
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      if (status === OnlineStatusType.OFFLINE) {
        // display overlay
        this.isOffline = true;
      } else if (status === OnlineStatusType.ONLINE) {
        // close overlay
        this.isOffline = false;
      }
    })
  }

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
