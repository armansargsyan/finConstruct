import {Injectable} from "@angular/core";

export interface customDate{
  day: number,
  month: number,
  year: number,
  date: Date,
  setDay(value: number): void,
  setMonth(value: number): void,
  setYear(value: number): void,
  setDate(value: Date): void,
}

export class CustomDate implements customDate{
  day;
  month;
  year;
  date;
  setDay(value: number){
    this.date.setDate(value);
    this.day = this.date.getDate();
  }
  setMonth(value: number){

    this.date.setMonth(value);
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear()
  }
  setYear(value: number){
    this.date.setFullYear(value);
    this.year = this.date.getFullYear();
  }
  setDate(value: Date){
    this.day = value.getDate();
    this.month = value.getMonth();
    this.year = value.getFullYear();
    this.date = value;
  }

  constructor(date: Date) {
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.date = new Date(date);
  }
}


@Injectable()
export class DateService {

  private yearsArrayShift: number = 4;
  private yearsArrayLength: number = 16;
  getMonthDaysArray(day: Date): number[]{
    let resultArray: number[] = [];
    let lastDay: Date = DateService.getLastDayOfMonth(day);
    let daysCount: number = lastDay.getDate();
    let dayOfWeek: number = DateService.getDayOfWeek(lastDay);

    for (let i = 1; i <= dayOfWeek + daysCount; i++){
      resultArray.push(i - dayOfWeek);
    }
    return resultArray;
  }

  getYearArray(year: number): number[]{
    let resultArray: number[] = [];
    let currentYear = year - 4;
    for (let i = 0; i < 16; i++){
      resultArray.push(currentYear++)
    }
    return resultArray;
  }

  getYearMatrixShiftPage(direction: number, firstYear: number): number[]{
    let year = direction < 0 ?
      firstYear - (this.yearsArrayLength - this.yearsArrayShift) :
      firstYear + (this.yearsArrayLength + this.yearsArrayShift);
    return this.getYearArray(year);
  }

  getMonthsArray(): string[]{
    return [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  }

  getWeekDaysArray(): string[]{
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  private static getLastDayOfMonth(day: Date): Date{
    return new Date(day.getFullYear(), day.getMonth() + 1, 0);
  }
  private static getDayOfWeek(day: Date): number{
    return new Date(day.getFullYear(), day.getMonth(), 1).getDay();
  }
}
