import { Injectable } from '@angular/core';
import { Subject, throwError } from "rxjs";
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

  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
  ) {
    this._fetchSubmissions();
  }

  getSubmissions() {
    this._fetchSubmissions();
    return this.submissionList;
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
        this.submissions = submissions;
        this.submissionList.next(this.submissions.slice());
      }
    )
  }

  getSubmission(id: string) {
    return this.submissions.find(s => s.id === id);
  }

  editSubmission(id: string, submission: Submission) {
    const index = this.submissions.indexOf(submission);
    this.submissions[index] = submission;
    this._editSubmissions();
  }

  addSubmission(submission: Submission) {
    this.submissions.push(submission);
    this._editSubmissions();
  }

  deleteSubmission(id: string, submission: Submission) {
    const index = this.submissions.indexOf(submission);
    delete this.submissions[index];
    this._editSubmissions();
  }

  _editSubmissions() {
    this.http.put(
      environment.FIREBASE_CONFIG.databaseURL+'submissions.json',
      this.submissions
    ).subscribe(() => {
      this._fetchSubmissions();
    });
  }
}
