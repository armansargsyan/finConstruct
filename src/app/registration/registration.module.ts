import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./components/registrationComponent/registration.component";
import {RegistrationFirstChildComponent} from "./components/registrationFirstChildComponent/registration-first-child.component";
import {RegistrationSecondChildComponent} from "./components/registrationSecondChildComponent/registrationSecondChild.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationComponent,
    RegistrationFirstChildComponent,
    RegistrationSecondChildComponent
  ],

  providers: [],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule{

}
