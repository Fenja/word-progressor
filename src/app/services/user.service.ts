import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  showOnlyWip: boolean = false;
  isSortByDeadline: boolean = false;
  $filterChange = new Subject<void>();

  // TODO save user settings

  toggleShowOnlyWip() {
    this.showOnlyWip = !this.showOnlyWip;
    this.$filterChange.next();
  }

  toggleSortByDeadline() {
    this.isSortByDeadline = !this.isSortByDeadline;
    this.$filterChange.next();
  }
}
