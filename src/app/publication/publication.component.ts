import { Component, Input } from '@angular/core';
import { Publication } from "./publication.model";
import { Project } from "../project/project.model";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html'
})
export class PublicationComponent {

  @Input() publication!: Publication;
  @Input() project!: Project;
}
