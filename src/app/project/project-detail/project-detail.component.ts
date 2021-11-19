import { Component, OnInit } from '@angular/core';
import { CountEntity, Project } from "../project.model";
import { ProjectService } from "../project.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AddWordsDialogComponent } from "../add-words-dialog/add-words-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddNoteDialogComponent } from "../add-note-dialog/add-note-dialog.component";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

  project!: Project;
  id!: string;

  eCountEntity = CountEntity;

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
        let result: Project | undefined = this.projectService.getProject(this.id);
        if (!!result) {
          this.project = result;
        } else {
          // TODO show error
          console.log('project with id ' + this.id + ' not found');
          this.router.navigate(['/projects']).then();
        }
      }
    )
  }

  addToProject() {
    this.dialog.open(AddWordsDialogComponent,{
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
      this.dialog.open(AddNoteDialogComponent, {
        data: {
          id: this.project.id,
          project: this.project
        }
      });
    }
  }
}
