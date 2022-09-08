import { Component, Input } from '@angular/core';
import { Milestone } from "./milestone.model";

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
})
export class MilestonesComponent {

  @Input() milestones!: Milestone[];
  @Input() contentEditable: boolean = false;

}
