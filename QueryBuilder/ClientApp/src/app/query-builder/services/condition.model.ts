import { Operators } from "src/app/query-builder/services/operators";

export class Condition {
  text: string;
  key: string;
  operator: Operators;
  value: any;
  items: Condition[] = [];

  constructor(key:string, operator: Operators, value:any) {
    this.key = key;
    this.operator = operator;
    this.value = value;
  }

  
}
