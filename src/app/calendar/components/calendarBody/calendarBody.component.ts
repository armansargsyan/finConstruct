import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {DateService} from "../../date.service";

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendarBody.component.html',
  styleUrls: ['./calendarBody.component.css']
})
export class CalendarBodyComponent implements OnInit {
  public yearsMatrix: number[][] = [];
  public monthDaysMatrix: number[][] = [];
  public monthsMatrix: string[][] =
    [
      ["January", "February", "March", "April"],
      ["May", "June", "July", "August"],
      ["September", "October", "November", "December"]
    ];
  public weekDaysArray: string[] =
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  @Input()
  selectedValue: Date = new Date();
  @Output()
  selectedValueChange: EventEmitter<Date> = new EventEmitter();
  public valueForView: Date = new Date(this.selectedValue);
  public today: Date = new Date();
  public state: string = 'days';


  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
     let {
        monthDaysMatrix, yearsMatrix
      } = this.dateService.getMonthAndYearMatrices(this.valueForView);

     this.monthDaysMatrix = monthDaysMatrix;
     this.yearsMatrix = yearsMatrix;
  }

  setValue(value: number, prop: string) {
    switch (prop) {
      case 'day':
        (this.valueForView).setDate(value);
        this.selectedValue = new Date(this.valueForView);
        this.changeValue(this.selectedValue);
        break;
      case 'month':
        (this.valueForView).setMonth(value);
        this.monthDaysMatrix = this.dateService.getMonthDaysMatrix(this.valueForView);
        this.state = 'days';
        break;
      case 'year':
        (this.valueForView).setFullYear(value);
        this.state = 'months';
        break;
      default:
        throw new Error('Custom error');
    }
  }


  yearsButton() {
    switch (this.state){
      case 'days':
        if (!this.haveYearView(this.valueForView.getFullYear())){
          this.yearsMatrix = this.dateService.getYearMatrix(this.valueForView.getFullYear());
        }
        this.state = 'years';
        break;
      case 'years':
      case 'months':
        this.valueForView = new Date(this.selectedValue);
        this.state = 'days';
        break;
    }

  }

  changePage(shift: number) {
    switch (this.state){
      case 'days':
        this.valueForView.setMonth(this.valueForView.getMonth() + shift);
        this.monthDaysMatrix = this.dateService.getMonthDaysMatrix(this.valueForView);
        break;
      case 'months':
        this.valueForView.setFullYear(this.valueForView.getFullYear() + shift);
        this.state = 'days';
        break;
      case 'years':
        this.yearsMatrix = this.dateService.getYearMatrixShiftPage(shift, this.yearsMatrix[0][0]);
        break;
    }
  }

  haveYearView(year: number, matrix: number[][] = this.yearsMatrix): boolean{
    return (year >= matrix[0][0] && year <= matrix[matrix.length - 1][matrix[0].length - 1]);
  }

  changeValue(value: Date): void{
    this.selectedValueChange.emit(value);
  }
}
