import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionEditComponent } from './submission-edit.component';
import { MatDialogRef } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {SubmissionService} from "../submission.service";
import {TranslationService} from "../../translation/translation.service";

describe('SubmissionEditComponent', () => {
  let component: SubmissionEditComponent;
  let fixture: ComponentFixture<SubmissionEditComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionEditComponent ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: SubmissionService, useValue: ''},
        { provide: TranslationService, useValue: ''},
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: '/42'},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
