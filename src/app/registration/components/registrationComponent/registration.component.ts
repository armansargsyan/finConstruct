import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  public isSecondStep: boolean = false;

  public userFormGroup: FormGroup = new FormGroup({
    'firstStep': new FormGroup(
      {
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'age': new FormControl('', [Validators.required, Validators.min(18)]),
        'email': new FormControl('', [Validators.required, Validators.email])
      }
    ),
    'secondStep': new FormGroup(
      {
        'password': new FormControl('', [Validators.required])
      }
    )
  });
  public firstStepForm: FormGroup = <FormGroup>this.userFormGroup.controls['firstStep'];
  public secondStepForm: FormGroup = <FormGroup>this.userFormGroup.controls['secondStep'];

  submitForm() {
    console.log(this.userFormGroup.value)
  }

  changeStep() {
    this.isSecondStep = !this.isSecondStep;
  }


}
