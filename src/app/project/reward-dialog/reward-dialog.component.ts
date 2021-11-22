import { Component, Inject } from '@angular/core';
import { Project, ProjectEvent } from "../project.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../project.service";

export interface RewardDialogData {
  event: ProjectEvent;
  project: Project;
}

@Component({
  selector: 'app-reward-dialog',
  templateUrl: './reward-dialog.component.html'
})
export class RewardDialogComponent {

  msgReward!: string;
  msgSpecified!: string;
  project!: Project;

  constructor(
    public dialogRef: MatDialogRef<RewardDialogComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: RewardDialogData
  ) {
    this.project = data.project;
    this.msgSpecified = !!data.project.reward ?
      'msg_reward_specified' :
      'msg_reward_unspecified';
    this._setRewardMsg(data.event);
  }

  rewardNow() {
    this.close();
    this.project.reward = undefined;
    this.projectService.editProject(this.project.id!, this.project);
  }

  rewardLater() {
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  private _setRewardMsg(event: ProjectEvent): void {
    switch (event) {
      case ProjectEvent.finish_first_draft:
        this.msgReward = 'msg_reward_first_draft'; break;
      case ProjectEvent.submit:
        this.msgReward = 'msg_reward_submit'; break;
      case ProjectEvent.publish:
        this.msgReward = 'msg_reward_publish'; break;
      default:
        this.msgReward = 'msg_reward_default';
    }
  }
}
