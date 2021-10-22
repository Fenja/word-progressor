import { TestBed } from '@angular/core/testing';
import { DataStorageService } from "./data-storage.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CountEntity, Project, ProjectState, ProjectType } from "../project/project.model";


describe('DataStorageService', () => {
  let service: DataStorageService;
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
    id: '42'
  };

  describe('Authenticated user', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: HttpClient,
            useValue: HttpClientTestingModule
          },{
            provide: AuthService,
            useValue: {
              checkAnonymous: () => {},
              isAnonymous: () => false,
              userId: () => '42',
            }
          }
        ]
      });
      service = TestBed.inject(DataStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('gets empty projects when request before fetch', () => {
      expect(service.getProjects).toEqual([]);
    });

    it('sends new project via http', () => {
      //expect(service.addProject(mockProject)).toBeTruthy();
      // TODO implement test
    });

    it('sends edited project via http', () => {
      // TODO implement test
    });

    it('deletes project via http', () => {
      // TODO implement test
    });

    it('creates new user at API', () => {
      // TODO implement test
    });

    it('edits user via http', () => {
      // TODO implement test
    });

    it('deletes user via http', () => {
      // TODO implement test
    });
  });



  describe('Anonymous user', () => {
    let store: {[key: string]: string};

    beforeEach(() => {
      store = {};
      spyOn(localStorage, 'getItem').and.callFake(function (key) {
        return store[key];
      });
      spyOn(localStorage, 'setItem').and.callFake(function (key, value){
        return store[key] = value + '';
      });

      TestBed.configureTestingModule({
        providers: [
          {
            provide: HttpClient,
            useValue: {}
          }, {
            provide: AuthService,
            useValue: {
              checkAnonymous: () => {},
              isAnonymous: () => true,
              userId: () => '42',
            }
          }
        ]
      });
      service = TestBed.inject(DataStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('gets empty projects when request before fetch', () => {
      expect(service.getProjects).toEqual([]);
    });

    it('adds project to storage', () => {
      expect(service.getProjects).toEqual([]);
      service.addProject(mockProject);
      expect(service.getProjects).toEqual([mockProject]);
    });

    it('edits project in storage', () => {
      service.addProject(mockProject);
      expect(service.getProjects).toEqual([mockProject]);
      let projectToEdit = service.getProjects().find(p => p.id == '42');
      expect(projectToEdit).toBeTruthy();
      expect(projectToEdit).toEqual(mockProject);
      projectToEdit!.workingTitle = 'New Working Title';
      service.editProject('42', projectToEdit!);
      expect(service.getProjects.length).toEqual(1);
      let editedProject = service.getProjects().find(p => p.id == '42');
      expect(editedProject).toEqual(projectToEdit);
    });

    it('deletes project from storage', () => {
      service.addProject(mockProject);
      service.deleteProject('42');
      let deletedProject = service.getProjects().find(p => p.id == '42');
      expect(deletedProject).toBeFalsy();
    });

    it('creates new user in storage for anonymous user', () => {
      service.fetchUser();
      expect(service.user).toBeTruthy();
    });

    it('edits user in storage', () => {
      // TODO implement
    });

    it('deletes user in storage', () => {
      service.fetchUser();
      service.deleteUser();
      expect(service.user).toBeFalsy();
    });

  })
});
