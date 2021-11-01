import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration-third-child',
  templateUrl: './registrationThirdChild.component.html',
  styleUrls: ['./registrationThirdChild.component.css']
})
export class RegistrationThirdChildComponent{
  @Output() backStepEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() firstStepFormGroup: FormGroup = new FormGroup({});

  backStep(): void{
    this.backStepEvent.emit();
  }

  formSubmit(): void{
    this.formSubmitEvent.emit();
  }
}
