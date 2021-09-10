import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemComponent } from './project-item.component';
import {Project, ProjectState, ProjectType} from "../project.model";
import {By} from "@angular/platform-browser";
import {ProjectListComponent} from "../project-list/project-list.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {of} from "rxjs";
import {TranslatePipe} from "../../translation/translate.pipe";

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

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

  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectListComponent,
        ProjectItemComponent,
        TranslatePipe,
      ],
      imports: [MatDialogModule]
    })
      .compileComponents();

    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows project working title as heading', () => {
    const {debugElement} = fixture;
    const heading = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(heading.textContent).toContain(mockProject.workingTitle);
  });

  it('has a button to show project details', () => {
    const {debugElement} = fixture;
    const button = debugElement.query(By.css('[data-testid="project-detail-button"]'));
    expect(button).toBeTruthy();
  });
});
