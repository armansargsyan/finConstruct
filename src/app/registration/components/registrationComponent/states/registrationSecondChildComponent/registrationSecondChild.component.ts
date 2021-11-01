import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration-second-child',
  templateUrl: './registrationSecondChild.component.html',
  styleUrls: ['./registrationSecondChild.component.css']
})
export class RegistrationSecondChildComponent{
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

}
