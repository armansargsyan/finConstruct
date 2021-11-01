import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-registration-second-child',
  templateUrl: './registrationSecondChild.component.html',
  styleUrls: ['./registrationSecondChild.component.css']
})
export class RegistrationSecondChildComponent implements OnInit{
  @Input()
  secondStepFormGroup: FormGroup = new FormGroup({});
  @Output()
  backStepEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  nextStepEvent: EventEmitter<void> = new EventEmitter<void>();
  confirmPassword: string = '';

  backStep():void {
    this.backStepEvent.emit();
  }

  nextStep(): void{
    this.nextStepEvent.emit();
  }

  passwordConfirmValidator(): void{
      if (this.secondStepFormGroup.controls['password'].value === this.secondStepFormGroup.controls['confirmPassword'].value){
        this.secondStepFormGroup.controls['confirmPassword'].setErrors(null)
      }
      else{
        this.secondStepFormGroup.controls['confirmPassword'].setErrors({invalid: true})

      }
  }

  ngOnInit(): void {
  }

}
