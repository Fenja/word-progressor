import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-progress-bar',
  templateUrl: './project-progress-bar.component.html',
})
export class ProjectProgressBarComponent implements OnInit {

  @Input() goalCount: number = 0;
  @Input() currentCount: number = 0;

  percentageDone: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.percentageDone = (this.currentCount / this.goalCount) * 100;
    if (this.percentageDone > 100) this.percentageDone = 100;
  }

}
