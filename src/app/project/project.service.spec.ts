import { ProjectService } from './project.service';
import { Project, ProjectState, ProjectType } from "./project.model";
import { TestBed } from "@angular/core/testing";
import { DataStorageService } from "../services/data-storage.service";
import { SnackbarService } from "../services/snackbar.service";
import { TranslationService } from "../translation/translation.service";
import {TranslatePipe} from "../translation/translate.pipe";

describe('ProjectService', () => {
  let service: ProjectService;
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
    currentWordcount: 10000,
    goalWordcount: 80000,
    id: '42'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatePipe ],
      providers: [
        {
          provide: DataStorageService,
          useValue: {
            projectList: () => [],
            getProjects: () => [],
            fetchProjects: () => [],
            projects: () => [],
            addProject: () => {},
            editProject: () => {},
            deleteProject: () => {},
          }
        }, {
          provide: SnackbarService,
          useValue: {
            showSnackBar: () => {},
          }
        }
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('delivers all projects', () => {
    let projects: Project[] | undefined;
    projects = service.getProjects(); // TODO subscribe
    expect(projects).toBeTruthy();
  });

  it('delivers project with specific id', () => {
    let project = service.getProject('42');
    expect(project).toBeTruthy();
  });

  it('adds new project', () => {
    service.addProject(mockProject);
    let projects = service.getProjects();
    expect(projects).toContain(mockProject);
  });

  it('changes property of a project using edit', () => {
    let id = '42';
    let project = service.getProject(id);
    expect(project).toBeTruthy();
    project!.workingTitle = "final title";
    project!.currentWordcount = 30000;
    project!.state = ProjectState.submit;
    service.editProject(id, project!);

    let editedProject = service.getProject(id);
    expect(editedProject).toBeTruthy();
    expect(editedProject!.workingTitle).toBe("final title");
    expect(editedProject!.currentWordcount).toBe(30000);
    expect(editedProject!.state).toBe(ProjectState.submit);
  });

  it('does not change a project, when edited with the same project', () => {
    let id = '42';
    let project = service.getProject(id);
    service.editProject(id, project!);
    let editedProject = service.getProject(id);
    expect(editedProject).toBeTruthy();
    expect(project).toEqual(editedProject);
  });

  it('deletes a project with specific id', () => {
    let id = '42';
    let project = service.getProject(id);
    service.deleteProject(id, project!.workingTitle);
    let deletedProject = service.getProject(id);
    expect(deletedProject).toBeFalsy();
    let projects = service.getProjects();
    expect(projects[1] == project).toBe(false);
  });

  it('does not delete any project when id does not exist', () => {
    let projectsBefore: Project[] = service.getProjects();
    service.deleteProject('42', 'WT');
    let projectsAfter: Project[] = service.getProjects();
    expect(projectsBefore).toEqual(projectsAfter);
  });

  it('knows whether id exists', () => {
    expect(service.hasProject('42')).toBe(true);
    expect(service.hasProject('xxx')).toBe(false);
  });
});
