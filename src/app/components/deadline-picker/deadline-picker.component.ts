import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deadline-picker',
  templateUrl: './deadline-picker.component.html'
})
export class DeadlinePickerComponent {

  @Input() deadline: Date | undefined;
  @Output() deadlineChange = new EventEmitter<Date | undefined>();

  constructor() { }

}
