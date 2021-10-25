import {Component, OnInit} from '@angular/core';

export enum OPERATORS {
  plus = '+',
  minus = '-',
  multiple = '*',
  division = '/',
  percent = '%'
}
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public result: string = '0';
  public ac: boolean = true;
  public currentOperator: string = '';
  private newNumber: boolean = false;
  private expression: any[] = [];


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

    if (!this.result.includes('.') && +this.result === 0) {
      if (number === '0') return;
      this.result = this.result.replace('0', number);
    }
    else this.result += number;

  }

  addPoint(){
    if (this.newNumber) {
      this.result = '0';
      this.newNumber = false;
    }

    if (!this.result.includes('.')){
      this.result += '.';
    }
  }

  operatorClick(operator: string) {

    this.currentOperator = operator;

    if (operator === OPERATORS.percent) {
      this.percent();
    } else if (!this.expression.length) {
      this.expression = [+this.result, operator];
      this.newNumber = true;
    } else {
      if (this.newNumber) {
        this.expression[this.expression.length - 1] = operator;
      } else {
        // this.array.push(+this.result);
        this.result = this.recursiveOperation(+this.result, !this.hidePriorityOperator(<OPERATORS>operator)).toString();
        this.expression.push(operator);
        this.newNumber = true;

      }
    }
  }

  equal() {
    this.result = this.recursiveOperation(+this.result).toString();
    this.currentOperator = '';

  }

  clear() {
    if (this.result === '0') {
      this.expression = [];
      this.currentOperator = '';
    }
    this.ac = true;
    this.result = '0'
    this.newNumber = false;

  }

  minusToPlus() {
    if (this.result === '0') {
      this.result = '-0';
    } else this.result = (+this.result * (-1)).toString();
  }

  private recursiveOperation(result: number, all: boolean = true): number {
    if (this.expression.length !== 1) {

      this.expression.push(result);
    }

    if (!all) {
      const prevOperator = this.expression[this.expression.length - 2];
      if (this.hidePriorityOperator(prevOperator)) {
        result = this.recursiveOperation(CalculatorComponent.calculateOperation(...this.expression.splice(-3) as [number, string, number]), all);
      }
    } else if (this.expression.length > 2) {
      result = this.recursiveOperation(CalculatorComponent.calculateOperation(...this.expression.splice(-3) as [number, string, number]));
    }
    return result;
  }

  private static calculateOperation(firstNumber: number, operator: string, secondNumber: number): number {

    switch (operator) {
      case OPERATORS.plus:
        return firstNumber + secondNumber;
      case OPERATORS.minus:
        return firstNumber - secondNumber;
      case OPERATORS.multiple:
        return firstNumber * secondNumber;
      case OPERATORS.division:
        return firstNumber / secondNumber;
      default:
        throw new Error(`Custom error Unknown operator: ${operator}`);
    }

  }

  private percent() {
    let operator = this.expression[this.expression.length - 1];
    if (operator && !this.hidePriorityOperator(operator)) {
      this.result = (this.expression[this.expression.length - 2] * (+this.result / 100)).toString();
    } else {
      this.result = (+this.result / 100).toString();
    }
    this.newNumber = true;

  }

  hidePriorityOperator(operator: OPERATORS): boolean{
    return operator === OPERATORS.division || operator === OPERATORS.multiple;
  }

}
