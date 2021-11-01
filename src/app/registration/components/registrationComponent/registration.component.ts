import {Component} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

export enum STATES{
  FIRST= 'firstStep',
  SECOND= 'secondStep',
  THIRD= 'thirdStep'
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  public isSecondStep: boolean = false;

  public states = STATES;
  public currentState: STATES = STATES.FIRST;

  public userFormGroup: FormGroup = new FormGroup({
    firstStep: new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        age: new FormControl('', [Validators.required, Validators.min(18)]),
        email: new FormControl('', [Validators.required, Validators.email])
      }
    ),
    secondStep: new FormGroup(
      {
        password: new FormControl('', [Validators.required, this.passwordConfirmValidator()]),
        confirmPassword: new FormControl('', [Validators.required, this.passwordConfirmValidator()])
      }
    )
  });
  public firstStepForm: FormGroup = <FormGroup>this.userFormGroup.controls['firstStep'];
  public secondStepForm: FormGroup = <FormGroup>this.userFormGroup.controls['secondStep'];

  constructor() {
  /*  this.userFormGroup = new FormGroup({
      firstStep: new FormGroup(
        {
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          age: new FormControl('', [Validators.required, Validators.min(18)]),
          email: new FormControl('', [Validators.required, Validators.email])
        }
      ),
      secondStep: new FormGroup(
        {
          password: new FormControl('', [Validators.required, this.passwordConfirmValidator()]),
          confirmPassword: new FormControl('', [Validators.required, this.passwordConfirmValidator()])
        }
      )
    });

    this.firstStepForm =<FormGroup>this.userFormGroup.controls['firstStep'];
    this.secondStepForm =<FormGroup>this.userFormGroup.controls['secondStep'];*/
  }
  passwordConfirmValidator(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === control.parent?.value['confirmPassword'] || control.value === control.parent?.value['password']){
        control.parent?.get('password')?.setErrors(null)
        control.parent?.get('confirmPassword')?.setErrors(null)
        return null
      }
      return {"confirmPassword": true};
    }
  }

  submitForm() {
    console.log(this.userFormGroup.value)
  }

  changeStep(state: STATES) {
    this.currentState = state;
  }


}
