import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration-second-child',
  templateUrl: './registrationSecondChild.component.html',
  styleUrls: ['./registrationSecondChild.component.css']
})
export class RegistrationSecondChildComponent implements OnInit{
  @Input()
  secondStepFormGroup: FormGroup = new FormGroup({});
  @Output()
  submitEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  lastStepEvent: EventEmitter<void> = new EventEmitter<void>();
  confirmPassword: string = '';

  submitForm():void {
    this.submitEvent.emit();
  }

  lastStep(): void{
    this.lastStepEvent.emit();
  }

  passwordConfirmValidator(control: FormControl): {[s:string]:boolean}|null{

    if(control.value === this.confirmPassword){
      return {"confirmPassword": true};
    }
    return null;
  }

  changeConfirmPassword(confirmPassword?: string) {
    if (confirmPassword) this.confirmPassword = confirmPassword;
    if (this.secondStepFormGroup.controls['password'].value === this.confirmPassword){
      this.secondStepFormGroup.controls['password'].setErrors(null);
    }
    else{
      this.secondStepFormGroup.controls['password'].setErrors({'invalid': true});
    }
  }

  ngOnInit(): void {
    // this.secondStepFormGroup.controls['password'].setValidators([Validators.required, <ValidatorFn>this.passwordConfirmValidator.bind(this)]);
    // this.secondStepFormGroup.controls['password'].updateValueAndValidity();
  }
}
