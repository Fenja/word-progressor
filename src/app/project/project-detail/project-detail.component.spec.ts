import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { TranslatePipe } from "../../translation/translate.pipe";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { Project, ProjectState, ProjectType } from "../project.model";
import { MatDialogModule } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import {ProjectService} from "../project.service";

function getTitle(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="project-title"]')).nativeElement.textContent;
}

function getProjectType(debugElement: any): ProjectType {
  return debugElement.query(By.css('[data-testid="project-type"]')).nativeElement.value;
}

function getDescription(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="project-description"]')).nativeElement.textContent;
}

function getProjectState(debugElement: any): ProjectState {
  return debugElement.query(By.css('[data-testid="project-state"]')).nativeElement.value;
}

function getProgressBar(debugElement: any): any {
  return debugElement.query(By.css('[data-testid="project-progress-bar"]')).nativeElement;
}

function getWordCountString(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="project-word-count"]')).nativeElement.textContent;
}

function clickEditButton(debugElement: any): void {
  return debugElement.query(By.css('[data-testid="project-edit-button"]')).nativeElement.click();
}

function clickAddWordsButton(debugElement: any): void {
  return debugElement.query(By.css('[data-testid="project-words-button"]')).nativeElement.click();
}

function clickDeleteButton(debugElement: any): void {
  return debugElement.query(By.css('[data-testid="project-delete-button"]')).nativeElement.click();
}


describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  let mockId: 0;
  const mockProject: Project = {
    workingTitle: 'Mock Project',
    description: 'description',
    imagePath: '',
    type: ProjectType.novel,
    state: ProjectState.draft_1,
    deadline: new Date(2020, 10, 11),
    currentWordcount: 10000,
    goalWordcount: 80000,
    id: '42'
  };

  describe('Details of fully filled project', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          ProjectDetailComponent,
          TranslatePipe,
        ],
        providers: [{
          provide: ActivatedRoute,
          useValue: {
            params: of([{
              id: mockId,
            }])
          }
        },
          {
            provide: Router,
            useValue: { navigate: () => {}}
          },
          {
            provide: ProjectService,
            useValue: {
              getProject: () => {return mockProject;},
            }
          }
        ],
        imports: [MatDialogModule]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectDetailComponent);
      component = fixture.componentInstance;
      component.project = mockProject;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('shows project working title as heading', () => {
      const {debugElement} = fixture;
      const heading = debugElement.query(By.css('h2')).nativeElement;
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain(mockProject.workingTitle);
    });

    it('has all detail fields for fully filled project', () => {
      let {debugElement} = fixture;
      expect(debugElement.query(By.css('[data-testid="project-title"]'))).toBeTruthy();
      expect(debugElement.query(By.css('[data-testid="project-description"]'))).toBeTruthy();
      expect(debugElement.query(By.css('[data-testid="project-image"]'))).toBeTruthy();
      //expect(debugElement.query(By.css('[data-testid="project-type"]'))).toBeTruthy();
      expect(debugElement.query(By.css('[data-testid="word-progress-container"]'))).toBeTruthy();
    });

    it('displays all details', () => {
      let {debugElement} = fixture;
      expect(getTitle(debugElement)).toBe(mockProject!.workingTitle);
    });
  });


  /*describe('Details of blank project', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          ProjectDetailComponent,
          TranslatePipe,
        ],
        providers: [{
          provide: ActivatedRoute,
          useValue: {
            params: of([{
              id: mockId,
              project: mockProjectBlank,
            }])
          }
        },
          {
            provide: Router,
            useValue: { navigate: () => {}}
          }
        ],
        imports: [MatDialogModule]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  });*/
});
