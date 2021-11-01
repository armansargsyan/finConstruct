import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./components/registrationComponent/registration.component";
import {RegistrationFirstChildComponent} from "./components/registrationComponent/states/registrationFirstChildComponent/registration-first-child.component";
import {RegistrationSecondChildComponent} from "./components/registrationComponent/states/registrationSecondChildComponent/registrationSecondChild.component";
import {RegistrationThirdChildComponent} from "./components/registrationComponent/states/registrationThirdChildComponent/registrationThirdChild.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
    declarations: [
        RegistrationComponent,
        RegistrationFirstChildComponent,
        RegistrationSecondChildComponent,
        RegistrationThirdChildComponent
    ],

  providers: [],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule{

}
