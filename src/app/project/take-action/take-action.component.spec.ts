import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeActionComponent } from './take-action.component';
import { CountEntity, Project, ProjectEvent, ProjectState, ProjectType } from "../project.model";

describe('TakeActionComponent', () => {
  let component: TakeActionComponent;
  let fixture: ComponentFixture<TakeActionComponent>;

  let mockProject: Project = {
    countEntity: CountEntity.words,
    creationDate: new Date(2017, 10, 5),
    currentCount: 1000,
    deadline: undefined,
    description: "",
    goalCount: 50000,
    imagePath: "",
    isWorkInProgress: false,
    lastUpdate: new Date(2017, 10, 5),
    state: ProjectState.idea,
    type: ProjectType.novel,
    workingTitle: "MockProject"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeActionComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeActionComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('always contains wait action', () => {
    expect(component.projectActions).toContain(ProjectEvent.lay_aside);
  });

  it('sets wip when starting', () => {
    component.takeAction(ProjectEvent.start);
    expect(mockProject.state).toEqual(ProjectState.draft_1);
    expect(mockProject.isWorkInProgress).toBeTruthy();
  });

  it('processes the finish draft event', () => {
    component.takeAction(ProjectEvent.finish_first_draft);
    expect(mockProject.state).toEqual(ProjectState.wait);
  });
});
