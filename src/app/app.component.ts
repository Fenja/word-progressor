import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { TranslationService } from "./translation/translation.service";
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import {ThemeService} from "./theme/theme.service";
import {Theme} from "./theme/symbols";
import {UserService} from "./services/user.service";

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
    private userService: UserService,
    private themeService: ThemeService,
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
    });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm(this.translationService.translate('msg_update_available'))) {
          window.location.reload();
        }
      })
    }

    this._initTheme();
  }

  private _initTheme() {
    this.themeService.themeChange
      .subscribe((theme: Theme) => this.updateTheme(theme));

    // set vars from localStorage, if existant
    this.themeService.loadCssVarsFromLocalStorage();
    // load user and set vars
    this.userService.getUser().subscribe(user => {
      if(!!user.settings?.cssVars) {
        this.themeService.loadCssVarsFromUserSettings(user.settings!.cssVars);
      }
    });
  }

  private updateTheme(theme: Theme) {
    const element = document.documentElement;

    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }
  }
}
