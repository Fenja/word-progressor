import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ProjectEditComponent } from './project-edit.component';
import {By} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { of} from "rxjs";
import {ProjectService} from "../project.service";
import {Project, ProjectState, ProjectType} from "../project.model";
import {TranslatePipe} from "../../translation/translate.pipe";


function getTitleInput(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="title-input"]')).nativeElement.textContent;
}

function getDescriptionInput(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="description-input"]')).nativeElement.textContent;
}

function getImageInput(debugElement: any): string {
  return debugElement.query(By.css('[data-testid="image-input"]')).nativeElement.textContent;
}

function getSelectedType(debugElement: any): ProjectType | undefined {
  return debugElement.query(By.css('[data-testid="type-select"]')).nativeElement.selected;
}

function getSelectedState(debugElement: any): ProjectState | undefined {
  return debugElement.query(By.css('[data-testid="state-select"]')).nativeElement.selected;
}

function getPickedDeadline(debugElement: any): Date | undefined {
  return debugElement.query(By.css('[data-testid="deadline-picker"]')).nativeElement.value;
}

function getGoalWordcountInput(debugElement: any): number {
  return debugElement.query(By.css('[data-testid="goal-wordcount-input"]')).nativeElement.value;
}

function getCurrentWordcountInput(debugElement: any): number {
  return debugElement.query(By.css('[data-testid="current-wordcount-input"]')).nativeElement.value;
}

function clickSaveButton(debugElement: any): void {
  return debugElement.query(By.css('[data-testid="save-button"]')).nativeElement.click();
}

function clickCancelButton(debugElement: any): void {
  return debugElement.query(By.css('[data-testid="cancel-button"]')).nativeElement.click();
}

describe('ProjectEditComponent', () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;

  const mockProject: Project = new Project(
    'Mock Project',
    'description',
    '',
    ProjectType.novel,
    ProjectState.draft_1,
    new Date(2020, 10, 11),
    10000,
    80000
  );

  const mockRouter = { navigate: () => {}}

  describe('New Project', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [
          ProjectEditComponent,
          TranslatePipe,
        ],
        providers: [ {
          provide: ActivatedRoute,
          useValue: {
            params: of([{id: null}]),
          },
        },
          {
            provide: Router,
            useValue: mockRouter
          }],
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectEditComponent);
      component = fixture.componentInstance;
      component.project = new Project();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    /*it('has empty or default inputs on new project', async () => {
      fixture.whenStable().then(() => {
        const {debugElement} = fixture;
        expect(getTitleInput(debugElement)).toBe('');
        expect(getDescriptionInput(debugElement)).toBe('');
        expect(getImageInput(debugElement)).toBe('');
        //expect(getSelectedType(debugElement)).toBe(ProjectType.short_story);
        //expect(getSelectedState(debugElement)).toBe(ProjectState.idea);
        expect(getPickedDeadline(debugElement)?.toDateString).toBe('');
        expect(+getCurrentWordcountInput(debugElement)).toBe(0);
        expect(+getGoalWordcountInput(debugElement)).toBe(0);
      });
    });*/

    it('creates new project on submit', () => {
      component.project.workingTitle = 'NYT Bestseller';
      component.project.goalWordcount = 50000;
      const {debugElement} = fixture;
      clickSaveButton(debugElement);
      expect(component.project.workingTitle).toBe('NYT Bestseller');
      expect(component.project.goalWordcount).toBe(50000);
    });
  });

  describe('Edit Project', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          FormsModule,
        ],
        declarations: [
          ProjectEditComponent,
          TranslatePipe,
        ],
        providers: [{
          provide: ActivatedRoute,
          useValue: {
            params: of([{id: 0}]),
          },
        },
          {
            provide: ProjectService,
            useValue: {
              getProject: () => { return mockProject; },
              addProject: () => {}
            }
          },
          {
            provide: Router,
            useValue: mockRouter
          }],
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectEditComponent);
      component = fixture.componentInstance;
      component.project = mockProject;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    /*it('loads properties from project to edit', () => {
      fixture.whenStable().then(() => {
        const {debugElement} = fixture;
        expect(getTitleInput(debugElement)).toBe(mockProject.workingTitle);
        expect(getDescriptionInput(debugElement)).toBe(mockProject.description);
        expect(getImageInput(debugElement)).toBe(mockProject.imagePath);
        //expect(getSelectedType(debugElement)).toBe(mockProject.type);
        //expect(getSelectedState(debugElement)).toBe(mockProject.state);
        expect(getPickedDeadline(debugElement)).toBe(mockProject.deadline);
        expect(getCurrentWordcountInput(debugElement)).toBe(mockProject.currentWordcount);
        expect(getGoalWordcountInput(debugElement)).toBe(mockProject.goalWordcount);
      });
    });*/

    it('saves edits at project', () => {
      component.project.workingTitle = 'NYT Bestseller';
      component.project.goalWordcount = 50000;
      const {debugElement} = fixture;
      clickSaveButton(debugElement);
      expect(component.project.workingTitle).toBe('NYT Bestseller');
      expect(component.project.goalWordcount).toBe(50000);
    })
  });

});
