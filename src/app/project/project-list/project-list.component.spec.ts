import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { Project, ProjectState, ProjectType } from "../project.model";
import { By } from "@angular/platform-browser";
import { ProjectService } from "../project.service";
import { TranslationService } from "../../translation/translation.service";
import { TranslatePipe } from "../../translation/translate.pipe";

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

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

  const mockProjectService = new ProjectService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, TranslatePipe ],
      providers: [
        TranslationService,
        {
        provide: ProjectService,
        useValue: mockProjectService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains project items in list', () => {
    const {debugElement} = fixture;
    const listEntry = debugElement.query(By.css('app-project-item'));
    expect(listEntry).toBeTruthy();
  });

  it('shows info when projects are empty', () => {
    component.projects = [];
    fixture.detectChanges();
    const {debugElement} = fixture;
    const emptyInfo = debugElement.query(By.css('.empty-info'));
    expect(emptyInfo).toBeTruthy();
  });

  it('shows no empty info when there are projects', () => {
    component.projects = [];
    for(let i = 0; i < 4; i++) {
      component.projects.push(mockProject);
    }
    fixture.detectChanges();
    const {debugElement} = fixture;
    const emptyInfo = debugElement.query(By.css('.empty-info'));
    expect(emptyInfo).toBeFalsy();
  });

  it('displays project items in a list', () => {
    component.projects = [];
    for(let i = 0; i < 4; i++) {
      component.projects.push(mockProject);
    }
    fixture.detectChanges();
    const {debugElement} = fixture;
    const listEntries = debugElement.queryAll(By.css('app-project-item'));
    expect(listEntries.length).toBe(4);
  });

  /*it('displays only 10 projects, when more than 10 projects are available', () => {
    component.projects = [];
    for(let i = 0; i < 12; i++) {
      component.projects.push(mockProject);
    }
    fixture.detectChanges();
    const {debugElement} = fixture;
    const listEntries = debugElement.queryAll(By.css('app-project-item'));
    expect(listEntries.length).toBe(10);
  });*/

  it('has a footer', () => {
    const {debugElement} = fixture;
    const footer = debugElement.query(By.css('app-project-footer'));
    expect(footer).toBeTruthy();
  });
});
