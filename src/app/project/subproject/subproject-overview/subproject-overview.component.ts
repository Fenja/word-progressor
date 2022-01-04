import { Component, Input } from '@angular/core';
import { Subproject } from "../subproject.model";

@Component({
  selector: 'app-subproject-overview',
  templateUrl: './subproject-overview.component.html'
})
export class SubprojectOverviewComponent {

  @Input() subproject!: Subproject;

}
