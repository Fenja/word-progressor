import { ProjectService } from './project.service';
import {Project, ProjectState, ProjectType} from "./project.model";

describe('ProjectService', () => {
  let service: ProjectService;
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

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ProjectService);
    service = new ProjectService();
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
    let project: Project = service.getProject(1);
    expect(project).toBeTruthy();
  });

  it('adds new project', () => {
    service.addProject(mockProject);
    let projects = service.getProjects();
    expect(projects).toContain(mockProject);
  });

  it('changes property of a project using edit', () => {
    let id = 1;
    let project: Project = service.getProject(id);
    project.workingTitle = "final title";
    project.currentWordcount = 30000;
    project.state = ProjectState.submit;
    service.editProject(1, project);

    let editedProject = service.getProject(id);
    expect(editedProject).toBeTruthy();
    expect(editedProject.workingTitle).toBe("final title");
    expect(editedProject.currentWordcount).toBe(30000);
    expect(editedProject.state).toBe(ProjectState.submit);
  });

  it('does not change a project, when edited with the same project', () => {
    let id = 1;
    let project: Project = service.getProject(id);
    service.editProject(1, project);
    let editedProject = service.getProject(id);
    expect(editedProject).toBeTruthy();
    expect(project).toEqual(editedProject);
  });

  it('deletes a project with specific id', () => {
    let project: Project = service.getProject(1);
    service.deleteProject(1);
    let deletedProject = service.getProject(1);
    expect(deletedProject).toBeFalsy();
    let projects = service.getProjects();
    expect(projects[1] == project).toBe(false);
  }); // TODO deletes at index right now

  it('does not delete any project when id does not exist', () => {
    let projectsBefore: Project[] = service.getProjects();
    service.deleteProject(42);
    let projectsAfter: Project[] = service.getProjects();
    expect(projectsBefore).toEqual(projectsAfter);
  });

  it('knows wether id exists', () => {
    expect(service.hasProject(0)).toBe(true);
    expect(service.hasProject(42)).toBe(false);
  });
});
