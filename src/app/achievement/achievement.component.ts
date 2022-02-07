import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html'
})
export class AchievementComponent implements OnInit {

  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

}
