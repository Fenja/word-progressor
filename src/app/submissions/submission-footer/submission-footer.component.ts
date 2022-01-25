import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-submission-footer',
  templateUrl: './submission-footer.component.html',
  styleUrls: ['./submission-footer.component.scss']
})
export class SubmissionFooterComponent implements OnInit {

  @Input() totalSubmissionsLength = 0;
  @Input() displaySubmissionsLength = 0;

  isAdmin: boolean | undefined;

  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (user && user.settings) this.isAdmin = user.settings.isAdmin;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
