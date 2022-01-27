import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectService} from "../project.service";
import {CountEntity, Project, ProjectState, ProjectType} from "../project.model";
import {FormControl, NgForm} from "@angular/forms";
import {map, startWith, take} from "rxjs/operators";

import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import {TranslationService} from "../../translation/translation.service";
import {Observable} from "rxjs";
import * as uuid from "uuid";
import {Submission} from "../../submissions/submission.model";
import {SubmissionService} from "../../submissions/submission.service";

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

  eProjectType = ProjectType;
  eProjectState = ProjectState;
  eCountEntity = CountEntity;

  @ViewChild('projectForm', {static: false}) projectForm!: NgForm;
  filteredGenres!: Observable<string[]>;
  genreControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private translationService: TranslationService,
    private _adapter: DateAdapter<any>,
    private submissionService: SubmissionService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
    ).subscribe(
      (params: Params) => {
        this.id = params['id'];
        const submissionId = params['subid'];
        this.editMode = params['id'] != null;

        if (this.editMode) {
          let result: Project | undefined = this.projectService.getProject(this.id);
          if (!!result) this.project = result;
          if (this.project.state === ProjectState.published && !this.project.publication) {
            this.project.publication = {
              title: '',
            }
          }
        } else if (!!submissionId) {
          const submission = this.submissionService.getSubmission(submissionId);
          if (!!submission) {
            this.createProjectFromSubmission(submission);
          }
        }
      }
    );

    this._adapter.setLocale(this.translationService.getLocale());

    this.filteredGenres = this.genreControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.genres.filter((system: string) => system.toLowerCase().includes(filterValue));
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

  addSubproject() {
    if (!this.project.subprojects) this.project.subprojects = [];
    this.project.subprojects?.push({
      countEntity: this.project.countEntity,
      currentCount: 0,
      description: "",
      goalCount: 0,
      isWorkInProgress: false,
      state: this.project.state,
      workingTitle: ""
    });
  }

  createProjectFromSubmission(submission: Submission) {
    this.project = {
      id: uuid.v4(),
      countEntity: submission.countEntity,
      creationDate: new Date(),
      currentCount: 0,
      deadline: submission.deadline,
      description: "",
      goalCount: submission.minCount ?? 0,
      maxGoalCount: submission.maxCount,
      imagePath: "",
      isWorkInProgress: false,
      lastUpdate: new Date(),
      state: ProjectState.idea,
      type: this._determineProjectType(submission),
      workingTitle: submission.title,
      language: submission.language,
      submission: submission
    }
  }

  _determineProjectType(submission: Submission): ProjectType {
    return ProjectType.short_story; // TODO change according to wordcount
  }

  genres = [
    this.translationService.translate('genre_fantasy'),
    this.translationService.translate('genre_scifi'),
    this.translationService.translate('genre_mystery'),
    this.translationService.translate('genre_thriller'),
    this.translationService.translate('genre_romance'),
    this.translationService.translate('genre_western'),
    this.translationService.translate('genre_dystopian'),
    this.translationService.translate('genre_contemporary'),
    this.translationService.translate('genre_non_fiction')
  ];
}
