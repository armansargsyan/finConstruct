import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-registration-first-child',
  templateUrl: './registration-first-child.component.html',
  styleUrls: ['./registration-first-child.component.css']
})
export class RegistrationFirstChildComponent{
  @Input()
  firstStepFormGroup: FormGroup = new FormGroup({});
  @Output()
  nextStepEvent: EventEmitter<void> = new EventEmitter<void>();

  nextStep(): void{
    this.nextStepEvent.emit();
  }
}
