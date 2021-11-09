import { Component, Input } from '@angular/core';
import { Project } from "../project.model";

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html'
})
export class ProjectOverviewComponent {

  @Input() project!: Project;

}
