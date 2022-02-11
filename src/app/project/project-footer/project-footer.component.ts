import { Component, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  @Input() totalProjectsLength = 0;
  @Input() displayProjectsLength = 0;

  settings: Settings = Utils.getDefaultSettings();
  isFilterActive!: boolean;
  isSortActive!: boolean;
  isHideActive!: boolean;

  constructor(
    public userService: UserService,
  ) {
    this.userService.getUser().subscribe(u => {
      if (u && u.settings) {
        this.settings = u.settings;
        this.isFilterActive = this.settings.filterWip || this.settings.filterSubprojects || this.settings.filterDeadline;
          /* && this.settings.filterPrep && this.settings.filterWait && this.settings.filterDraft && this.settings.filterFinished
          && this.settings.filterLong && this.settings.filterShort*/

        this.isSortActive = this.settings.isSortAlphabetical || this.settings.isSortByDeadline || this.settings.isSortByUpdate;
        this.isHideActive = this.settings.isHideFinished || this.settings.isHidePublished || this.settings.isHideAbandoned || this.settings.isHideSubmitted;
      }
    })
  }


  applySort(sortName: string) {
    if (sortName === 'alphabet') {
      if (!this.settings.isSortAlphabetical) {
        this.settings.isSortAlphabetical = true;
        this.settings.isSortByDeadline = false;
        this.settings.isSortByUpdate = false;
      } else {
        this.settings.isSortAlphabetical = false;
      }
    } else if (sortName === 'deadline') {
      if (!this.settings.isSortByDeadline) {
        this.settings.isSortAlphabetical = false;
        this.settings.isSortByDeadline = true;
        this.settings.isSortByUpdate = false;
      } else {
        this.settings.isSortByDeadline = false;
      }
    } else if (sortName === 'update') {
      if (!this.settings.isSortByUpdate) {
        this.settings.isSortAlphabetical = false;
        this.settings.isSortByDeadline = false;
        this.settings.isSortByUpdate = true;
      } else {
        this.settings.isSortByUpdate = false;
      }
    }
    this.userService.changedFilter(this.settings);
  }

  applyFilter(filterName: string) {
    switch (filterName) {
      case 'prep': this.settings.filterPrep = !this.settings.filterPrep; break;
      case 'draft': this.settings.filterDraft = !this.settings.filterDraft; break;
      case 'wait': this.settings.filterWait = !this.settings.filterWait; break;
      case 'finished': this.settings.filterFinished = !this.settings.filterFinished; break;
      case 'inactive': this.settings.filterInactive = !this.settings.filterInactive; break;
      case 'wip': this.settings.filterWip = !this.settings.filterWip; break;
      case 'deadline': this.settings.filterDeadline = !this.settings.filterDeadline; break;
      case 'long': this.settings.filterLong = !this.settings.filterLong; break;
      case 'short': this.settings.filterShort = !this.settings.filterShort; break;
      case 'subprojects': this.settings.filterSubprojects = !this.settings.filterSubprojects; break;
      case 'all': {
        if (this.settings.filterWip) {
          this.settings.filterPrep = false;
          this.settings.filterDraft = false;
          this.settings.filterWait = false;
          this.settings.filterFinished = false;
          this.settings.filterInactive = false;
          this.settings.filterWip = false;
          this.settings.filterLong = false;
          this.settings.filterShort = false;
          this.settings.filterSubprojects = false;
          this.settings.filterDeadline = false;
        } else {
          this.settings.filterPrep = true;
          this.settings.filterDraft = true;
          this.settings.filterWait = true;
          this.settings.filterFinished = true;
          this.settings.filterInactive = true;
          this.settings.filterWip = true;
          this.settings.filterLong = true;
          this.settings.filterShort = true;
          this.settings.filterSubprojects = true;
          this.settings.filterDeadline = true;
        }
      }
    }
    this.userService.changedFilter(this.settings);
  }

  hide(hideName: string) {
    switch (hideName) {
      case 'finished': this.settings.isHideFinished = !this.settings.isHideFinished; break;
      case 'published': this.settings.isHidePublished = !this.settings.isHidePublished; break;
      case 'abandoned': this.settings.isHideAbandoned = !this.settings.isHideAbandoned; break;
      case 'submitted': this.settings.isHideSubmitted = !this.settings.isHideSubmitted; break;
    }
    this.userService.changedFilter(this.settings);
  }
}

