import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CustomDate, customDate} from "../../date.service";

@Component({
  selector: 'app-calendar-input',
  templateUrl: './calendarInput.component.html',
  styleUrls: ['./calendarInput.component.css']
})
export class CalendarInputComponent{
  @Input()
  value: Date = new Date();
  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  customValue: customDate;
  body: boolean = false;

  constructor() {
    this.customValue = new CustomDate(this.value);
  }

  openBody() {
    this.body = !this.body;
  }

  valueChangeEvent(selectedValue: customDate) {
    this.valueChange.emit(selectedValue.date);
    this.customValue = selectedValue;
  }
}
