import { Component, Input, OnInit } from '@angular/core';
import { WordLog } from "../../project/project.model";

export class BarModel {
  value!: number;
  color!: string;
  size!: string;
  legend!: string;
}
// https://medium.com/@alfredoezequiel2/how-to-make-a-simple-bar-chart-with-angular-6c93b42fc99e

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  @Input() wordLogs!: WordLog[];
  @Input() color?: string = 'rebeccapurple';
  @Input() dailyGoal?: number;

  data: BarModel[] = [];
  public total = 0;
  barWidth!: string;

  ngOnInit(): void {
    if (!this.wordLogs) return;
    this.barWidth = (100 / this.wordLogs.length) + '%';
    this.total = this.wordLogs.reduce((prev, current) => (prev.words > current.words) ? prev : current).words;
    this.wordLogs.forEach(log => {
      const size = Math.round(log.words*100/this.total) + '%';
      const color = (this.dailyGoal && this.dailyGoal <= log.words) ? '#FFC107' : 'rebeccapurple'; // TODO theme colors
      this.data.push({
        value: log.words,
        color,
        size,
        legend: log.date
      })
    })
  }

}
