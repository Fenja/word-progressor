import {ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AddWordsDialogComponent } from './add-words-dialog.component';
import { Project, ProjectState, ProjectType } from "../project.model";
import { ProjectService } from "../project.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "../../translation/translate.pipe";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LogWordsService } from "../../services/log-words.service";

describe('AddWordsDialogComponent', () => {
  let component: AddWordsDialogComponent;
  let fixture: ComponentFixture<AddWordsDialogComponent>;

  const mockProject: Project = {
    creationDate: new Date(),
    isWorkInProgress: false,
    lastUpdate: new Date(),
    workingTitle: 'Mock Project',
    description: 'description',
    imagePath: '',
    type: ProjectType.novel,
    state: ProjectState.draft_1,
    deadline: new Date(2020, 10, 11),
    currentCount: 10000,
    goalCount: 80000,
    id: '42'
  };

  const mockProjectService = {
    getProject() { return of(mockProject); },
    editProject() {},
  }

  describe('add words dialog', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AddWordsDialogComponent,
          TranslatePipe,
        ],
        imports: [ FormsModule ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {}
          },
          {
          provide: ProjectService,
          useValue: mockProjectService
        },{
          provide: MAT_DIALOG_DATA,
          useValue: {
            project: mockProject,
            id: 0
          }
        },{
          provide: MatSnackBar,
          useValue: {
            open: () => {}
          }
        }, {
            provide: LogWordsService,
            useValue: {
              logWords: () => {},
            }
          }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AddWordsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('has project and id from injection', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.data.project).toBeTruthy();
        expect(component.data.project).toBe(mockProject);
        expect(component.data.id).toBe('42');
      });
    });

    it('always displays datepicker', () => {
      const {debugElement} = fixture;
      const dateInput = debugElement.query(By.css('[data-testid="deadline-picker"]'));
      expect(dateInput).toBeTruthy();
    });

    it('sets current word count as default input value', fakeAsync(() => {
      // TODO tap on tab
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let projectWordCount = component.data.project.currentCount;
        const {debugElement} = fixture;
        const wordCountInput = debugElement.query(By.css('[data-testid="current-wordcount-input"]'));
        expect(wordCountInput).toBeTruthy();
        console.log(wordCountInput.nativeElement.value);
        expect(+wordCountInput.nativeElement.value).toBe(projectWordCount);
      });
    }));
  });

  describe('add words to project with undefined id', () => {
    it('handles undefined id', async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AddWordsDialogComponent,
          TranslatePipe,
        ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {}
          },{
            provide: ProjectService,
            useValue: mockProjectService
          },{
            provide: MAT_DIALOG_DATA,
            useValue: {
              project: mockProject,
              id: 42
            }
          },{
            provide: MatSnackBar,
            useValue: {
              open: () => {}
            }
          }, {
            provide: LogWordsService,
            useValue: {
              logWords: () => {},
            }
          }
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(AddWordsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  /*describe('missing dialog data', () => {
    it('handles missing data', async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AddWordsDialogComponent,
          TranslatePipe
        ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {}
          },{
          provide: ProjectService,
          useValue: mockProjectService
        }]
      })
      .compileComponents();

      fixture = TestBed.createComponent(AddWordsDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });*/
});
