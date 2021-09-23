import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-progress-bar',
  templateUrl: './project-progress-bar.component.html',
})
export class ProjectProgressBarComponent implements OnInit {

  @Input() goalCount: number = 0;
  @Input() currentCount: number = 0;
  @Input() maxGoalCount: number | undefined;

  percentageDone: number = 0;
  percentageMaxDone: number = 0;
  firstBarWidthPercent: number = 100.0;

  constructor() { }

  ngOnInit(): void {
    this.percentageDone = (this.currentCount / this.goalCount) * 100;
    if (this.percentageDone > 100) this.percentageDone = 100;

    if (!!this.maxGoalCount) {
      this.percentageMaxDone = (this.currentCount / this.maxGoalCount) * 100;
      if (this.percentageMaxDone > 100) this.percentageMaxDone = 100;
      this.firstBarWidthPercent = (this.goalCount / this.maxGoalCount) * 100;
    }
  }

}
