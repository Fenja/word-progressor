import { Component, Input } from '@angular/core';
import { Project } from "../../project/project.model";

@Component({
  selector: 'app-bow-detail',
  templateUrl: './bow-detail.component.html'
})
export class BowDetailComponent {

  @Input() project!: Project;

  constructor() { }

}
