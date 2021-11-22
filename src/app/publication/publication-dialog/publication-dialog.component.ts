import { Component, Inject, Input } from '@angular/core';
import { Publication } from "../publication.model";
import { Project } from "../../project/project.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../../project/project.service";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";

export interface PublicationDialogData {
  project: Project;
}

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
})
export class PublicationDialogComponent {

  project!: Project;
  publication!: Publication;

  constructor(
    public dialogRef: MatDialogRef<PublicationDialogComponent>,
    private projectService: ProjectService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: PublicationDialogData
  ) {
    this.project = data.project;
    this.publication = {
      title: data.project.workingTitle,
    }
  }

  addPublication() {
    this.close();
    // push publication
    this.project.publication = this.publication;
    this.projectService.editProject(this.project.id!, this.project);
    this.snackBarService.showSnackBar(this.translationService.translate('msg_publication_added'));
  }

  close() {
    this.dialogRef.close();
  }

}
