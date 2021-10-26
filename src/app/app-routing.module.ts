import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {CalendarInputComponent} from "./calendar/components/calendarInput/calendarInput.component";
import {RegistrationComponent} from "./registration/components/registrationComponent/registration.component";

const routes: Routes = [
  {
    path: 'calculator', component: CalculatorComponent
  },
  {
    path: 'calendar', component: CalendarInputComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
