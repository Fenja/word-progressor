import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deadline-picker',
  templateUrl: './deadline-picker.component.html'
})
export class DeadlinePickerComponent {

  @Input() deadline: Date | undefined;
  @Input() label: string = 'label_deadline';
  @Output() deadlineChange = new EventEmitter<Date | undefined>();

  constructor() { }

}
