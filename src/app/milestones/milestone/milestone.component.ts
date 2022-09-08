import { Component, Input } from '@angular/core';
import { Milestone } from "../milestone.model";

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
})
export class MilestoneComponent {

  @Input() editableContent: boolean = false;
  @Input() milestone!: Milestone;

}
