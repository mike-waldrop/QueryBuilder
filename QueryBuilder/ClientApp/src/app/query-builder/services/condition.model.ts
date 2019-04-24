import { Operators } from "src/app/query-builder/services/operators.model";

export class Condition {
  text: string;
  key: string;
  arrayOwner: Condition[];
  operator: Operators;
  value: any;
  conditions: Condition[] = [];

  constructor(text:string, key:string, operator: Operators, value:any) {
    this.text = text;
    this.key = key;
    this.operator = operator;
    this.value = value;
  }

  add(condition: Condition) {
    condition.arrayOwner = this.conditions;
    this.conditions.push(condition);
  }
  
}
