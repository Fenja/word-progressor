import { Component, OnInit, ViewChild } from '@angular/core';
import { Submission } from "../submission.model";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import { CountEntity } from "../../project/project.model";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TranslationService } from "../../translation/translation.service";
import { SubmissionService } from "../submission.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-submission-edit',
  templateUrl: './submission-edit.component.html',
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
export class SubmissionEditComponent implements OnInit {

  id!: string;
  editMode: boolean = false;
  submission: Submission = {
    countEntity: CountEntity.words,
    deadline: new Date(),
    description: "",
    genre: "",
    language: "",
    link: '',
    restrictions: '',
    maxCount: 0,
    minCount: 0,
    title: '',
    favorites: 0
  };

  eCountEntity = CountEntity;

  @ViewChild('submissionForm', {static: false}) submissionForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private router: Router,
    private translationService: TranslationService,
    private _adapter: DateAdapter<any>,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
    ).subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;

        if (this.editMode) {
          let result: Submission | undefined = this.submissionService.getSubmission(this.id);
          if (!!result) this.submission = result;
        }
      }
    );

    this._adapter.setLocale(this.translationService.getLocale());
  }

  onSubmit(): void {
    if (!this.submissionForm.valid) return;

    if (!!this.submission) {
      if (this.editMode) {
        this.submissionService.editSubmission(this.id!, this.submission);
      } else {
        this.submissionService.addSubmission(this.submission);
      }
    }
    this.router.navigate(['/submissions']).then();
  }

  onCancel() {
    this.router.navigate(['/submissions']).then();
  }

  onDelete(): void {
    this.submissionService.deleteSubmission(this.id!, this.submission);
    this.router.navigate(['/submissions']).then();
  }
}
