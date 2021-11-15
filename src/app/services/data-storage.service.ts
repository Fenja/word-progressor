import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { userData } from "../auth/user.model";
import { environment } from "../../environments/environment";
import { Project } from "../project/project.model";
import { catchError, map, take } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import * as uuid from 'uuid';

/*
  this service should differ between a logged in user and an anonymous one
  authenticated users get their data from firebase api
  anonymous users get their data from local storage
 */

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  projects: Project[] = [];
  public projectList = new Subject<Project[]>();
  user: userData = {};
  public user$ = new Subject<userData>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.isAnonymous = !localStorage.getItem('user');
    this.fetchUser();
  }

  private _getUserId() {
    return this.authService.userData?.uid;
  }

  getProjects() {
    this._fetchProjects();
    return this.projects.slice();
  }

  private _fetchProjects() {
    this.projects = [];
    if (this.authService.isAnonymous) {
      this._fetchProjectsFromStorage();
    } else {
      this._fetchProjectsFromAPI();
    }
  }

  _fetchProjectsFromStorage() {
    const projects: Project[] = JSON.parse(<string>localStorage.getItem('projects'));
    if (projects) this.projects = projects;
    this.projectList.next(this.projects.slice());
  }

  _fetchProjectsFromAPI() {
    console.log('fetch projects from api');
    this.http.get<{ [key: string]: Project }>(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/projects.json'
    )
      .pipe(
        take(1),
        map((responseData) => {
          const projectArray: Project[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              projectArray.push({ ...responseData[key], id:key });
            }
          }
          return projectArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      )
      .subscribe(
        (projects) => {
          this.projects = projects;
          this.projectList.next(projects.slice());
        });
  }

  addProject(project: Project) {
    if (this.authService.isAnonymous) {
      this._addProjectToStorage(project);
    } else {
      this._addProjectToAPI(project);
    }
  }

  _addProjectToStorage(project: Project) {
    project.id = uuid.v4();
    this.projects.push(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this._fetchProjects();
  }

  _addProjectToAPI(project: Project) {
    this.http.post<any>(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/projects.json',
      project
    ).subscribe(() => {
        this._fetchProjects();
      },
      error => {
        console.log(error);
      }
    );
  }

  editProject(id: string, project: Project) {
    console.log('edit project');
    if (this.authService.isAnonymous) {
      this._editProjectInStorage(id, project);
    } else {
      this._editProjectAtAPI(id, project);
    }
  }

  _editProjectInStorage(id: string, project: Project) {
    this.projects.map(p => p.id === id || project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this._fetchProjects();
  }

  _editProjectAtAPI(id: string, project: Project) {
    console.log('project before', project);
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/projects/'+id+'.json',
      project
    ).subscribe(() => {
      this._fetchProjects();
    });
    this.http.get(environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/projects/'+id+'.json').subscribe(p => console.log('project after', p));
  }

  deleteProject(id: string) {
    if (this.authService.isAnonymous) {
      this._deleteProjectFromStorage(id);
    } else {
      this._deleteProjectAtAPI(id);
    }
  }

  _deleteProjectFromStorage(id: string) {
    let index: number = this.projects.findIndex(p => p.id === id);
    this.projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this._fetchProjects();
  }

  _deleteProjectAtAPI(id: string) {
    this.http.delete(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/projects/'+id+'.json',
    ).subscribe(() => {
      this._fetchProjects();
    });
  }

  fetchUser() {
    if (this.authService.isAnonymous) {
      this._fetchUserFromStorage();
    } else {
      this._fetchUserFromAPI();
    }
  }

  createNewUser() {
    this.user = {
      id: uuid.v4(),
      lastLogin: new Date(),
    };
  }

  _fetchUserFromStorage() {
    const user: userData = JSON.parse(<string>localStorage.getItem('local_user'));
    if (!user) {
      this.createNewUser();
    } else {
      this.user = user;
    }
    this.user$.next(this.user);
  }

  _fetchUserFromAPI() {
    const id = this._getUserId();
    if (!id) return;
    this.http.get<{ [key: string]: userData }>(
      environment.FIREBASE_CONFIG.databaseURL+id+'/user.json'
    )
    .pipe(
      take(1),
    )
    .subscribe(
      (user) => {
        if (!user) {
          this.createNewUser();
        } else {
          this.user = user;
        }
        console.log('fetch from api', JSON.stringify(this.user));
        this.user$.next(this.user);
      });
  }

  editUser(id: string, user: userData) {
    console.log('edit user');
    this.user = user;
    if (this.authService.isAnonymous) {
      this._editUserInStorage();
    } else {
      this._editUserAtAPI();
    }
  }

  _editUserInStorage() {
    localStorage.setItem('local_user', JSON.stringify(this.user));
    this.fetchUser();
  }

  _editUserAtAPI() {
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/user.json',
      this.user
    ).subscribe(() => {
      this.fetchUser();
    });
  }

  deleteUser() {
    if (this.authService.isAnonymous) {
      localStorage.clear();
    } else {
      this._deleteUserAtAPI();
    }
  }

  private _deleteUserAtAPI() {
    const id = this._getUserId();
    this.http.delete(
      environment.FIREBASE_CONFIG.databaseURL+id+'.json',
    ).subscribe(() => this.user = {});
    this.http.delete(
      environment.FIREBASE_CONFIG.databaseURL+id+'/user.json',
    );
  }

  editSettings(settings: { [key: string]: any }) {
    this.user.settings = settings;
    if (this.authService.isAnonymous) {
      this._editSettingsInStorage();
    } else {
      this._editSettingsAtAPI();
    }
  }

  _editSettingsInStorage() {
    localStorage.setItem('local_user', JSON.stringify(this.user));
  }

  _editSettingsAtAPI() {
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+this._getUserId()+'/user.json',
      this.user
    );
  }

  getSettings(): {[key: string]: any} {
    console.log('isAnonymous', this.authService.isAnonymous);

    console.log('fetched user', JSON.stringify(this.user.settings));
    return this.user.settings ? this.user.settings : {
      'showOnlyWip': false,
      'isSortByDeadline': false,
    };
  }
}
