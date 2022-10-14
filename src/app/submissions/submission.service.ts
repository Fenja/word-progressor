import { Injectable } from '@angular/core';
import { Subject, throwError} from "rxjs";
import { Submission } from "./submission.model";
import { TranslationService } from "../translation/translation.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  submissions: Submission[] = [];
  public submissionList = new Subject<Submission[]>();
  reports: string[] = [];
  public reportList = new Subject<string[]>();

  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
  ) {
    this._fetchSubmissions();
    this._fetchReports();
  }

  getSubmissions() {
    this._fetchSubmissions();
    return this.submissions.slice();
  }

  _fetchSubmissions() {
    this.http.get<{ [key: string]: Submission }>(
      environment.FIREBASE_CONFIG.databaseURL+'submissions.json'
    ).pipe(
      map((responseData) => {
        const subArray: Submission[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            subArray.push({ ...responseData[key], id:key });
          }
        }
        return subArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    )
      .subscribe(
      (submissions) => {
        this.submissions = [];
        this.submissions.push(...submissions.filter(s => !!s.title));
        this.submissionList.next(this.submissions.slice());
      }
    )
  }

  getSubmission(id: String) {
    return this.submissions.find(s => s.id === id);
  }

  editSubmission(id: string, submission: Submission) {
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+'submissions/'+id+'.json',
      submission
    ).subscribe(() => {
      this._fetchSubmissions();
    });
  }

  addSubmission(submission: Submission) {
    this.http.post<any>(
      environment.FIREBASE_CONFIG.databaseURL+'submissions.json',
      submission
    ).subscribe(() => {
        this._fetchSubmissions();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteSubmission(id: string, submission: Submission) {
    this.http.delete(
      environment.FIREBASE_CONFIG.databaseURL+'submissions/'+id+'.json',
    ).subscribe(() => {
      this._fetchSubmissions();
    });
  }

  reportSubmission(link: string) {
    if (this.reports.includes(link)) return;

    this.reports.push(link);
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+'reports.json',
      this.reports
    ).subscribe(() => this._fetchReports());
  }

  getReports() {
    return this.reports;
  }

  deleteReport(report: string) {
    let newReports = this.reports.filter(r => r !== report);
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+'reports.json',
      newReports
    ).subscribe(() => this._fetchReports());
  }

  _fetchReports() {
    return this.http.get<string[]>(environment.FIREBASE_CONFIG.databaseURL+'reports.json')
      .subscribe((reports) => {
        this.reports = [];
        if (!!reports) this.reports.push(...reports);
        this.reportList.next(this.reports.slice());
      });
  }
}
