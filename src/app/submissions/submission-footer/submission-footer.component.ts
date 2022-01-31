import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-submission-footer',
  templateUrl: './submission-footer.component.html',
  styleUrls: ['./submission-footer.component.scss']
})
export class SubmissionFooterComponent implements OnInit {

  @Input() totalSubmissionsLength = 0;
  @Input() displaySubmissionsLength = 0;

  private subscriptions: Subscription[] = [];
  settings: Settings = Utils.getDefaultSettings();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (user && user.settings) {
        this.settings = user.settings;
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleFilterFavorites() {
    this.settings.filterFavorites = !this.settings.filterFavorites;
    this.userService.changedFilter(this.settings);
  }
}
