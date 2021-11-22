import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProjectService } from "../project.service";
import { CountEntity, Project, ProjectState, ProjectType } from "../project.model";
import { NgForm } from "@angular/forms";
import { take } from "rxjs/operators";

import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { TranslationService } from "../../translation/translation.service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de_DE',
    }, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }, {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ],
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
    countEntity: CountEntity.words,
    currentCount: 0,
    goalCount: 0,
    isWorkInProgress: false,
    creationDate: new Date(),
    lastUpdate: new Date(),
  }
  showMore: boolean = false;

  eProjectType = ProjectType;
  eProjectState = ProjectState;
  eCountEntity = CountEntity;

  @ViewChild('projectForm', {static: false}) projectForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private translationService: TranslationService,
    private _adapter: DateAdapter<any>
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
          if (this.project.state === ProjectState.published && !this.project.publication) {
            this.project.publication = {
              title: '',
            }
          }
        }
      }
    );

    this._adapter.setLocale(this.translationService.getLocale());
  }

  onSubmit(): void {
    if (!this.projectForm.valid) return;

    if (!!this.project) {
      if (this.editMode) {
        this.projectService.editProject(this.id!, this.project);
      } else {
        this.projectService.addProject(this.project);
      }
    }
    this.router.navigate(['/projects']).then();
  }

  onCancel() {
    this.router.navigate(['/projects']).then();
  }

  deletePublication() {
    this.project.publication = undefined;
  }
}
