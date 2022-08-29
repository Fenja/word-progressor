import { Component, Input } from '@angular/core';
import { Project } from "../project.model";

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html'
})
export class ProjectThumbnailComponent {

  @Input() project!: Project;

}
