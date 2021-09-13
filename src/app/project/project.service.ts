import { Project } from "./project.model";
import { Subject, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

const FIREBASE_URL = environment.dbUrl + 'projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
  public projectList = new Subject<Project[]>();


  constructor(
    private http: HttpClient
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
      FIREBASE_URL,
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
      environment.dbUrl+'projects/'+id+'.json',
      project
    ).subscribe(response => {
      this.fetchProjects();
    });
  }

  deleteProject(id: string): void {
    this.http.delete(
      environment.dbUrl+'projects/'+id+'.json',
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
      FIREBASE_URL
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
