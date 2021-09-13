import { Project } from "./project.model";
import { Subject, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {catchError, map, take} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
  public projectList = new Subject<Project[]>();


  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.fetchProjects();
  }

  getProjects(): Project[] {
    this.fetchProjects();
    return this.projects.slice();
  }

  getProject(id: string): Project | undefined {
    let result = this.projects.find(p => p.id === id);
    console.log(result);
    return result;
  }

  addProject(project: Project) {
    this.http.post<any>(
      environment.FIREBASE_DB_URL+this.authService.userId+'/projects.json',
      project
    ).subscribe(responseData => {
      this.fetchProjects();
    },
      error => {
       console.log(error);
      }
    );
  }

  editProject(id: string, project: Project): void {
    this.http.put(
      environment.FIREBASE_DB_URL+'projects/'+id+'.json',
      project
    ).subscribe(response => {
      this.fetchProjects();
    });
  }

  deleteProject(id: string): void {
    this.http.delete(
      environment.FIREBASE_DB_URL+'projects/'+id+'.json',
    ).subscribe(response => {
      this.fetchProjects();
    });
  }

  hasProject(id: string): boolean {
    return !!(this.projects.find(p => p.id === id));
  }

  fetchProjects() {
    console.log('fetch projects');
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
          this.projects = projects
          this.projectList.next(this.projects.slice());
        });
  }
}
