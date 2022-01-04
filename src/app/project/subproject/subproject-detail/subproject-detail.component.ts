import {Component, Input} from '@angular/core';
import {Subproject} from "../subproject.model";
import {CountEntity, Project} from "../../project.model";

@Component({
  selector: 'app-subproject-detail',
  templateUrl: './subproject-detail.component.html'
})
export class SubprojectDetailComponent {

  @Input() project!: Project;
  @Input() subproject!: Subproject;

  eCountEntity = CountEntity;

  constructor() {}
}
