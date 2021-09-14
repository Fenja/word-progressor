import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {Project, ProjectState, ProjectType} from "../project.model";
import {NgForm} from "@angular/forms";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent implements OnInit {

  id!: string;
  editMode: boolean = false;
  project: Project = {
    workingTitle: '',
    description: '',
    imagePath: '',
    type: ProjectType.short_story,
    state: ProjectState.idea,
    deadline: undefined,
    currentWordcount: 0,
    goalWordcount: 0,
    isWorkInProgress: false,
    creationDate: new Date(),
    lastUpdate: new Date(),
  }

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
        this.id = params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {
          let result: Project | undefined = this.projectService.getProject(this.id);
          if (!!result) this.project = result;
        }
      }
    )
  }

  onSubmit(): void {
    if (!!this.project) {
      if (this.editMode) {
        this.projectService.editProject(this.id!, this.project);
      } else {
        this.projectService.addProject(this.project);
      }
    }
    this.router.navigate(['/projects']);
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }
}
