import {Injectable} from "@angular/core";

@Injectable()
export class DateService {

  public getMonthAndYearMatrices(date: Date, column?: number, row?: number): { monthDaysMatrix: number[][], yearsMatrix: number[][] }{
    return {
      monthDaysMatrix: this.getMonthDaysMatrix(date),
      yearsMatrix: this.getYearMatrix(date.getFullYear(), column, row)
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

  public getMonthDaysMatrix(day: Date, pageShift: number = 0): number[][]{
    let resultMatrix: number[][] = [];
    let lastDay: Date = this.getLastDayOfMonth(day);
    let daysCount: number = this.getDaysCount(lastDay);
    let dayOfWeek: number = this.getDayOfWeek(lastDay);
    let firstDayOfMonth: number = this.getFirstDayOfMonth(daysCount, dayOfWeek);

    for (let i = 0, currentDay = 0; currentDay < daysCount; i++){
      let resultMatrixRow: number[] = [];
      for (let j = 0; j < 7 && currentDay < daysCount; j++){
        if (i === 0 && j < firstDayOfMonth){
          resultMatrixRow.push(0);
        }
        else {
          resultMatrixRow.push(++currentDay);
        }
      }
      resultMatrix.push(resultMatrixRow);
    }
    return resultMatrix;
  }

  public getYearMatrix(year: number, column: number = 4, row: number = 4, pageShift: number = 0): number[][]{
    let resultMatrix: number[][] = [];
    let currentYear = year - column;
    for (let i = 0; i < row; i++){
      let resultMatrixRow: number[] = [];
      for (let j = 0; j < column; j++){
        resultMatrixRow.push(currentYear++);
      }
      resultMatrix.push(resultMatrixRow);
    }
    return resultMatrix;
  }

  public getYearMatrixShiftPage(shift: number, firstYear: number, row: number = 4, column: number = 4): number[][]{
    let year = shift < 0 ? firstYear - (row - 1) * column : firstYear + (row + 1) * column;
    return this.getYearMatrix(year, row, column);
  }
}
