import {Component, OnDestroy, OnInit} from '@angular/core';
import { CountEntity, Project } from "../project.model";
import { ProjectService } from "../project.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WordlogAddDialogComponent } from "../../wordlogs/wordlag-add-dialog/wordlog-add-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NoteAddDialogComponent } from "../../notes/note-add-dialog/note-add-dialog.component";
import { Subscription } from "rxjs";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project!: Project;
  id!: string;

  eCountEntity = CountEntity;
  private subscriptions: Subscription[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.subscriptions.push( this.projectService.getProjectSubscription(this.id).subscribe((result) => {
          if (!!result) {
            this.project = result;
            if (this.project.wordLogs) this.project.wordLogs = Utils.repairWordLogs(this.project.wordLogs);
            if (this.project.notes) this.project.notes = Utils.repairNotes(this.project.notes);
          } else {
            // TODO show error
            console.log('project with id ' + this.id + ' not found');
            this.router.navigate(['/projects']).then();
          }
        }) );
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  addToProject() {
    this.dialog.open(WordlogAddDialogComponent,{
      data: {
        id: this.id,
        project: this.project
      }
    });
  }

  deleteProject() {
    if (confirm("Are you sure to delete "+this.project.workingTitle)) {
      this.projectService.deleteProject(this.id, this.project.workingTitle);
      this.router.navigate(['/projects']).then();
    }
  }

  addNote() {
    if (this.project) {
      this.dialog.open(NoteAddDialogComponent, {
        data: {
          id: this.project.id,
          project: this.project
        }
      });
    }
  }

  openSubmission() {
    if (this.project.submission && this.project.submission.link) window.open(this.project.submission.link, "_blank");
  }
}
