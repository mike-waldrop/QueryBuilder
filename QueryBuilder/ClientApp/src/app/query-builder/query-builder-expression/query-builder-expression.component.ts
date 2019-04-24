import { Component, OnInit, Input} from '@angular/core';
import { Condition } from "src/app/query-builder/services/condition.model";
import { Operators } from 'src/app/query-builder/services/operators.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';

@Component({
  selector: 'query-builder-expression',
  templateUrl: './query-builder-expression.component.html',
  styleUrls: ['./query-builder-expression.component.css']
})
export class QueryBuilderExpressionComponent implements OnInit {
  @Input() condition: Condition;
  
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

  onAddClick(event$: Condition) {
    this.qbSvc.addNewCondition(event$);
  }

  ngOnInit() {
  }

}
