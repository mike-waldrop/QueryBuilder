import { Condition } from "src/app/query-builder/models/condition.model";
import { Conjunctions } from "src/app/query-builder/models/conjunctions.model";

export class Query {
  conditions: Condition[] = [];
  conjunction: Conjunctions = Conjunctions.and;

  add(condition: Condition) {
    condition.parent = this;
    this.conditions.push(condition);
  }
}
