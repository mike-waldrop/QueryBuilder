import { Operators } from "src/app/query-builder/models/operators.model";
import { Query } from "src/app/query-builder/models/query.model";
import { Conjunctions } from "src/app/query-builder/models/conjunctions.model";

export interface ConditionArgs {
  id: string;
  text: string;
  key: string;
  operator: Operators;
  value: any;
  type: string;
}

export class Condition {
  id: string;
  text: string;
  key: string;
  parent: Condition | Query;
  operator: Operators;
  value: any;
  type: string;
  conditions: Condition[] = [];
  conjunction: Conjunctions = undefined;

  //get conjunction(): Conjunctions {
  //  if (this.conditions.length == 0)
  //    this._conjunction = undefined;
  //  return this._conjunction;
  //}
  //set conjunction(theBar: Conjunctions) {
  //  this._conjunction = theBar;
  //}
  
  constructor(args: ConditionArgs ) {
    for (let key in args) {
      this[key] = args[key];
    }
    
  }

  add(condition: Condition) {
    condition.parent = this;
    if (condition.conditions.length == 0)
      condition.conjunction = Conjunctions.and;
    this.conditions.push(condition);
  }
  
}
