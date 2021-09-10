import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProjectService } from "../project.service";
import { Project, ProjectState, ProjectType } from "../project.model";
import { NgForm } from "@angular/forms";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent implements OnInit {

  id: number | undefined;
  editMode: boolean = false;
  project: Project = new Project();

  eProjectType = ProjectType;
  eProjectState = ProjectState;

  // @ts-ignore
  @ViewChild('projectForm', {static: false}) projectForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
    ).subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {
          this.project = this.projectService.getProject(this.id);
        } else {
          // default settings
          this.project.type = ProjectType.short_story;
          this.project.state = ProjectState.idea;
        }
      }
    )
  }

  onSubmit(): void {
    if (this.editMode) {
      this.projectService.editProject(this.id!, this.project);
    } else {
      this.projectService.addProject(this.project);
    }
    this.router.navigate(['/projects']);
  }

}
