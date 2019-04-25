import { Component, OnInit, Input} from '@angular/core';
import { Condition } from "src/app/query-builder/services/condition.model";
import { Operators } from 'src/app/query-builder/services/operators.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { Conjunctions } from 'src/app/query-builder/services/conjunctions.model';

@Component({
  selector: 'query-builder-expression',
  templateUrl: './query-builder-expression.component.html',
  styleUrls: ['./query-builder-expression.component.css']
})
export class QueryBuilderExpressionComponent implements OnInit {
  @Input() condition: Condition;

  conjunctionList: Array<{ text: string, value: Conjunctions }> = [
    { text: "and", value: Conjunctions.and },
    { text: "or", value: Conjunctions.or },
  ];
  
  operatorList: Array<{text:string ,value: Operators}> = [
    { text: "Contains", value: Operators.Contains },
    { text: "Does Not Contain", value: Operators.DoesNotContain },
    { text: "Equal To", value: Operators.EqualTo },
    { text: "Is In List", value: Operators.IsInList },
    { text: "Is Not In List", value: Operators.IsNotInList },
    { text: "Not Equal To", value: Operators.NotEqualTo },
    { text: "Starts With", value: Operators.StartsWith }
  ];

  public defaultItem: { text: string, value: Operators } = this.operatorList.find(v => v.value == Operators.EqualTo);

  constructor(private qbSvc: QueryBuilderService) { }

  onRemoveClick(event$: Condition) {
    this.qbSvc.removeCondition(event$);
  }

  onAddConditionClick(event$: Condition) {
    this.qbSvc.addNewCondition(event$);
  }

 onSelectKeyClick(model:any, selected: Condition) {
   selected.key = model.fullPath;
   selected.text = model.text;
   this.qbSvc.editCondition(selected);
  }

  operatorChange($event, selected: Condition) {
    this.qbSvc.editCondition(this.condition);
  }

  onValueChanged(data: string) {
    this.qbSvc.editCondition(this.condition);
  }

  ngOnInit() {
  }

}
