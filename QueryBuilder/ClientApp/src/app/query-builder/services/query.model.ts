import { Condition } from "src/app/query-builder/services/condition.model";

export class Query {
  conditions: Condition[] = [];

  add(condition: Condition) {
    condition.arrayOwner = this.conditions;
    this.conditions.push(condition);
  }
}
