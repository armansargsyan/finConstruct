import {Component} from "@angular/core";

@Component({
  selector: 'app-calendar-input',
  templateUrl: './calendarInput.component.html',
  styleUrls: ['./calendarInput.component.css']
})
export class CalendarInputComponent{
  value: Date = new Date();
  body: boolean = false;

  openBody() {
    this.body = !this.body;
  }
}
