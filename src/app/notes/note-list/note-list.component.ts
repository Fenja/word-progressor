import { Component, Input } from '@angular/core';
import { Project } from "../../project/project.model";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent {

  @Input() project!: Project;

}
