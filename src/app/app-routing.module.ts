import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {CalendarInputComponent} from "./calendar/components/calendarInput/calendarInput.component";

const routes: Routes = [
  {
    path: 'calculator', component: CalculatorComponent
  },
  {
    path: 'calendar', component: CalendarInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
