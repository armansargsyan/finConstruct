import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CustomDate, customDate, DateService} from "../../date.service";

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

  public yearsArray!: number[];
  public monthDaysArray!: number[];
  public monthsArray!: string[]
  public weekDaysArray!: string[];
  public valueForView!: customDate;
  public today: CustomDate = new CustomDate(new Date());
  public currentState: STATES = STATES.DAY;
  public states = STATES;

  @Input()
  selectedValue!: customDate;
  @Output()
  valueChange: EventEmitter<customDate> = new EventEmitter<CustomDate>();


  constructor(private dateService: DateService) {}

  ngOnInit(): void {

    this.valueForView = new CustomDate(this.selectedValue.date);

    this.monthsArray = this.dateService.getMonthsArray();
    this.weekDaysArray = this.dateService.getWeekDaysArray();
    this.monthDaysArray = this.dateService.getMonthDaysArray(this.valueForView.date);
    this.yearsArray = this.dateService.getYearArray(this.valueForView.year);

  }

  setValue(value: number, prop: string) {

    switch (prop) {
      case STATES.DAY:
        this.valueForView.setDay(value);
        this.selectedValue = new CustomDate(this.valueForView.date);
        this.changeValue(this.selectedValue);
        break;
      case STATES.MONTH:
        this.valueForView.setMonth(value);
        this.monthDaysArray = this.dateService.getMonthDaysArray(this.valueForView.date);
        this.currentState = STATES.DAY;
        break;
      case STATES.YEAR:
        this.valueForView.setYear(value);
        this.currentState = STATES.MONTH;
        break;
      default:
        throw new Error('Custom error');
    }

  }


  changeState() {

    switch (this.currentState){
      case STATES.DAY:
        if (!this.rangeCheck()){
          this.yearsArray = this.dateService.getYearArray(this.valueForView.year);
        }
        this.currentState = STATES.YEAR;
        this.valueForView = new CustomDate(this.selectedValue.date);

        break;
      case STATES.MONTH:
      case STATES.YEAR:
        this.valueForView = new CustomDate(this.selectedValue.date);
        this.currentState = STATES.DAY;
        break;
    }

  }

  changePage(direction: number) {

    switch (this.currentState){
      case STATES.DAY:
        this.valueForView.setMonth(this.valueForView.month + direction);
        this.monthDaysArray = this.dateService.getMonthDaysArray(this.valueForView.date);
        break;
      case STATES.MONTH:
        this.valueForView.setYear(this.valueForView.year + direction);
        break;
      case STATES.YEAR:
        this.yearsArray = this.dateService.getYearMatrixShiftPage(direction, this.yearsArray[0]);
        break;
    }

  }

  rangeCheck(): boolean{
    return (this.valueForView.year >= this.yearsArray[0]
      && this.valueForView.year <= this.yearsArray[this.yearsArray.length - 1]);
  }

  changeValue(value: customDate): void{
    this.valueChange.emit(value);
  }


}
