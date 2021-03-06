import { Component, Input, OnInit } from '@angular/core';
import { Project, ProjectEvent, ProjectState } from "../project.model";
import Utils from "../../helpers/utils";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { ProjectService } from "../project.service";
import { MatDialog } from "@angular/material/dialog";
import { PublicationDialogComponent } from "../../publication/publication-dialog/publication-dialog.component";
import { RewardDialogComponent } from "../reward-dialog/reward-dialog.component";

@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html'
})
export class TakeActionComponent implements OnInit {

  @Input() project!: Project;
  projectActions: ProjectEvent[] = [];

  constructor(
    private snackBarService: SnackbarService,
    private translateService: TranslationService,
    private projectService: ProjectService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.projectActions = Utils.getAvailableEventsForProjectState(this.project.state);
  }

  takeAction(event: ProjectEvent) {
    switch (event) {
      case ProjectEvent.start:
        this.project.state = ProjectState.draft_1;
        this.project.isWorkInProgress = true;
        break;
      case ProjectEvent.finish_first_draft:
        this.project.state = ProjectState.wait;
        this._rewardYourself(ProjectEvent.finish_first_draft);
        break;
      case ProjectEvent.finish_revision:
        this.project.state = ProjectState.finished;
        this._rewardYourself(ProjectEvent.finish_revision);
        break;
      case ProjectEvent.send_alpha:
        this.project.state = ProjectState.revise;
        break;
      case ProjectEvent.send_beta:
        this.project.state = ProjectState.revise;
        break;
      case ProjectEvent.send_editor:
        this.project.state = ProjectState.wait;
        break;
      case ProjectEvent.submit:
        this.project.state = ProjectState.submitted;
        this.project.isWorkInProgress = false;
        this._rewardYourself(ProjectEvent.submit);
        break;
      case ProjectEvent.rejected:
        this.project.state = ProjectState.finished;
        break;
      case ProjectEvent.publish:
        this.project.state = ProjectState.published;
        this.project.isWorkInProgress = false;
        this._rewardYourself(ProjectEvent.publish);
        this._createPublication();
        break;
      case ProjectEvent.lay_aside:
        this.project.state = ProjectState.abandon;
        this.project.isWorkInProgress = false;
        break;
    }
    this.snackBarService.showSnackBar(this.project.workingTitle + this.translateService.translate('msg_' + event));
    this.projectService.editProject(this.project.id!, this.project);
  }

  private _createPublication() {
    this.dialog.open(PublicationDialogComponent, {
      data: {
        project: this.project
      }
    });
  }

  private _rewardYourself(event: ProjectEvent) {
    this.dialog.open(RewardDialogComponent, {
      data: {
        project: this.project,
        event
      }
    });
  }
}
