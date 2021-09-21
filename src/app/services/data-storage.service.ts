import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";
import {Project} from "../project/project.model";
import {catchError, map, take} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.checkAnonymous();
  }

  get isAnonymous(): boolean | null {
    return this.authService.isAnonymous;
  }

  getProjects() {
    return this.projects.slice();
  }

  fetchProjects() {
    console.log('fetch projects');
    if (this.isAnonymous) {
      this._fetchProjectsFromStorage();
    } else {
      this._fetchProjectsFromAPI();
    }
  }

  _fetchProjectsFromStorage() {
    const projects: Project[] = JSON.parse(<string>localStorage.getItem('projects'));
    if (!!projects) this.projects = projects;
    this.projectList.next(this.projects.slice());
  }

  _fetchProjectsFromAPI() {
    this.http.get<{ [key: string]: Project }>(
      environment.FIREBASE_DB_URL+this.authService.userId+'/projects.json'
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
          console.log(projects);
          this.projects = projects;
          this.projectList.next(projects.slice());
        });
  }

  addProject(project: Project) {
    if (this.isAnonymous) {
      this._addProjectToStorage(project);
    } else {
      this._addProjectToAPI(project);
    }
  }

  _addProjectToStorage(project: Project) {
    project.id = uuid.v4();
    this.projects.push(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.fetchProjects();
  }

  _addProjectToAPI(project: Project) {
    this.http.post<any>(
      environment.FIREBASE_DB_URL+this.authService.userId+'/projects.json',
      project
    ).subscribe(() => {
        this.fetchProjects();
      },
      error => {
        console.log(error);
      }
    );
  }

  editProject(id: string, project: Project) {
    if (this.isAnonymous) {
      this._editProjectInStorage(id, project);
    } else {
      this._editProjectAtAPI(id, project);
    }
  }

  _editProjectInStorage(id: string, project: Project) {
    this.projects.map(p => p.id === id || project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.fetchProjects();
  }

  _editProjectAtAPI(id: string, project: Project) {
    this.http.put(
      environment.FIREBASE_DB_URL+'projects/'+id+'.json',
      project
    ).subscribe(() => {
      this.fetchProjects();
    });
  }

  deleteProject(id: string) {
    if (this.isAnonymous) {
      this._deleteProjectFromStorage(id);
    } else {
      this._deleteProjectAtAPI(id);
    }
  }

  _deleteProjectFromStorage(id: string) {
    let index: number = this.projects.findIndex(p => p.id === id);
    this.projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.fetchProjects();
  }

  _deleteProjectAtAPI(id: string) {
    this.http.delete(
      environment.FIREBASE_DB_URL+'projects/'+id+'.json',
    ).subscribe(() => {
      this.fetchProjects();
    });
  }

}
