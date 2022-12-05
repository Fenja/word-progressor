import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectOverviewComponent } from './project-overview.component';
import { By } from "@angular/platform-browser";
import { CountEntity, Project, ProjectState, ProjectType } from "../project.model";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('ProjectOverviewComponent', () => {
  let component: ProjectOverviewComponent;
  let fixture: ComponentFixture<ProjectOverviewComponent>;

  const mockProject: Project = {
    countEntity: CountEntity.words,
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
    id: '42',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOverviewComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverviewComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a progress bar', () => {
    const progressBar = fixture.debugElement.query(By.css('app-project-progress-bar'));
    expect(progressBar).toBeTruthy();
  });
});
