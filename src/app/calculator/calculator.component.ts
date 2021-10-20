import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public result: string = '0';
  private newNumber: boolean = false;
  private array: any[] = [];
  public ac: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  numberClick(number: string) {

    if (this.newNumber) {
      this.result = '0';
      this.newNumber = false;
    }
    if (this.ac) this.ac = !this.ac;

    if ((this.result === '0' || this.result === '-0') && number === '0') return;
    if (this.result === '0' && number !== '.') this.result = number;
    else if (this.result === '-0' && number !== '.') this.result = '-' + number;
    else this.result += number;

  }

  operatorClick(operator: string) {

    if (operator === '%') {
      this.percent();
    } else if (!this.array.length) {
      this.array.push(+this.result);
      this.array.push(operator);
      this.newNumber = true;
    } else {
      if (this.newNumber) {
        this.array[this.array.length - 1] = operator;
      } else {
        if (operator === '*' || operator === '/') {
          // this.array.push(+this.result);
          this.result = this.recursiveOperation(+this.result, false).toString();

        } else {
          this.result = this.recursiveOperation(+this.result).toString();
        }
        this.array.push(operator);
        this.newNumber = true;

      }
    }
    console.log(this.array)
  }

  private recursiveOperation(result: number, all: boolean = true): number {
    if (this.array.length !== 1) {

      this.array.push(result);
    }

    if (!all){
      if (this.array[this.array.length - 2] === '*' || this.array[this.array.length - 2] === '/'){
        // @ts-ignore
        result = this.recursiveOperation(this.operation(...this.array.splice(-3)), all);
      }
    }else if (this.array.length > 2) {
      // @ts-ignore
      result = this.recursiveOperation(this.operation(...this.array.splice(-3)));
    }
    return result;
  }

  private operation(firstNumber: number, operator: string, secondNumber: number): number {

    switch (operator) {
      case '+':
        return firstNumber + secondNumber;
      case '-':
        return firstNumber - secondNumber;
      case '*':
        return firstNumber * secondNumber;
      case '/':
        return firstNumber / secondNumber;
      default:
        throw new Error(`Custom error Unknown operator: ${operator}`);
    }

  }

  equal() {
    this.result = this.recursiveOperation(+this.result).toString();
  }


  clear() {
    if (this.result === '0') {
      this.array = [];
    }
    this.ac = true;
    this.result = '0';
    this.newNumber = false;

  }

  minusToPlus() {
    if (this.result === '0') {
      this.result = '-0';
    } else this.result = (+this.result * (-1)).toString();
  }

  private percent() {
    let operator = this.array[this.array.length - 1];
    if (operator === '+' || operator === '-'){
      console.log(this.array[this.array.length - 1], this.result)
      this.result = (this.array[this.array.length - 2]*(+this.result / 100)).toString();
    }
    else {
      this.result = (+this.result / 100).toString();
    }
    this.newNumber = true;

  }
}
