import {Injectable} from "@angular/core";

@Injectable()
export class DateService {

  public getMonthAndYearMatrices(date: Date): { monthDaysArray: number[], yearsArray: number[] }{
    return {
      monthDaysArray: this.getMonthDaysArray(date),
      yearsArray: this.getYearArray(date.getFullYear())
    };
  }

  private getLastDayOfMonth(day: Date): Date{
    return new Date(day.getFullYear(), day.getMonth() + 1, 0);
  }
  private getDaysCount(lastDayOfMonth: Date): number{
    return lastDayOfMonth.getDate();
  }
  private getDayOfWeek(day: Date): number{
    return day.getDay();
  }
  private getFirstDayOfMonth(daysCount: number, dayOfWeek: number): number{
    let resultDayOfWeek = dayOfWeek - (daysCount % 7 - 1);
    return resultDayOfWeek >= 0 ? resultDayOfWeek : 7 + resultDayOfWeek;
  }

  public getMonthDaysArray(day: Date): number[]{
    let resultArray: number[] = [];
    let lastDay: Date = this.getLastDayOfMonth(day);
    let daysCount: number = this.getDaysCount(lastDay);
    let dayOfWeek: number = this.getDayOfWeek(lastDay);
    let firstDayOfMonth: number = this.getFirstDayOfMonth(daysCount, dayOfWeek);

    for (let i = 1; i <= firstDayOfMonth + daysCount; i++){
      resultArray.push(i - firstDayOfMonth);
    }
    return resultArray;
  }

  public getYearArray(year: number): number[]{
    let resultArray: number[] = [];
    let currentYear = year - 4;
    for (let i = 0; i < 16; i++){
      resultArray.push(currentYear++)
    }
    return resultArray;
  }

  public getYearMatrixShiftPage(shift: number, firstYear: number): number[]{
    let year = shift < 0 ? firstYear - 12 : firstYear + 20;
    return this.getYearArray(year);
  }
}
