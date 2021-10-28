import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {DateService} from "../../date.service";

export enum STATES {
  DAY = 'days',
  MONTH = 'months',
  YEAR = 'years'
}

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendarBody.component.html',
  styleUrls: ['./calendarBody.component.css']
})
export class CalendarBodyComponent implements OnInit {
  public yearsArray: number[] = [];
  public monthDaysArray: number[] = [];
  public monthsArray: string[] =
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public weekDaysArray: string[] =
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  @Input()
  selectedValue: Date = new Date();
  @Output()
  selectedValueChange: EventEmitter<Date> = new EventEmitter();
  public valueForView: Date = new Date(this.selectedValue);
  public today: Date = new Date();
  public state: STATES = STATES.DAY;


  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.valueForView = new Date(this.selectedValue);
     let {
        monthDaysArray, yearsArray
      } = this.dateService.getMonthAndYearMatrices(this.valueForView);

     this.monthDaysArray = monthDaysArray;
     this.yearsArray = yearsArray;
  }

  setValue(value: number, prop: string) {
    switch (prop) {
      case STATES.DAY:
        (this.valueForView).setDate(value);
        this.selectedValue = new Date(this.valueForView);
        this.changeValue(this.selectedValue);
        break;
      case STATES.MONTH:
        (this.valueForView).setMonth(value);
        this.monthDaysArray = this.dateService.getMonthDaysArray(this.valueForView);
        this.state = STATES.DAY;
        break;
      case STATES.YEAR:
        (this.valueForView).setFullYear(value);
        this.state = STATES.MONTH;
        break;
      default:
        throw new Error('Custom error');
    }
  }


  changeState() {
    switch (this.state){
      case STATES.DAY:
        if (!this.haveYearView(this.valueForView.getFullYear())){
          this.yearsArray = this.dateService.getYearArray(this.valueForView.getFullYear());
        }
        this.state = STATES.YEAR;
        break;
      case STATES.MONTH:
      case STATES.YEAR:
        this.valueForView = new Date(this.selectedValue);
        this.state = STATES.DAY;
        break;
    }

  }

  changePage(shift: number) {
    switch (this.state){
      case STATES.DAY:
        this.valueForView.setMonth(this.valueForView.getMonth() + shift);
        this.monthDaysArray = this.dateService.getMonthDaysArray(this.valueForView);
        break;
      case STATES.MONTH:
        this.valueForView.setFullYear(this.valueForView.getFullYear() + shift);
        break;
      case STATES.YEAR:
        this.yearsArray = this.dateService.getYearMatrixShiftPage(shift, this.yearsArray[0]);
        break;
    }
  }

  haveYearView(year: number, array: number[] = this.yearsArray): boolean{
    return (year >= array[0] && year <= array[array.length - 1]);
  }

  changeValue(value: Date): void{
    this.selectedValueChange.emit(value);
  }
}
