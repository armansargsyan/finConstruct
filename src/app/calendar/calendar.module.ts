import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarBodyComponent} from "./components/calendarBody/calendarBody.component";
import {DateService} from "./date.service";
import {CalendarInputComponent} from "./components/calendarInput/calendarInput.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    CalendarInputComponent,
    CalendarBodyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [DateService],
  exports: [CalendarInputComponent]
})
export class CalendarModule { }
