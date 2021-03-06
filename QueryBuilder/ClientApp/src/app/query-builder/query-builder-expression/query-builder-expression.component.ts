import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { Condition } from "src/app/query-builder/models/condition.model";
import { Operators } from 'src/app/query-builder/models/operators.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { Conjunctions } from 'src/app/query-builder/models/conjunctions.model';
import { ModelMetaData } from 'src/app/query-builder/models/model-meta-data.model';

@Component({
  selector: 'query-builder-expression',
  templateUrl: './query-builder-expression.component.html',
  styleUrls: ['./query-builder-expression.component.css']
})
export class QueryBuilderExpressionComponent implements OnInit {
  @Input() condition: Condition;
  @ViewChild('conjunctiontarget') conjunctionTarget: ElementRef;
  @ViewChild('operatortarget') operatorTarget: ElementRef;
    
  conjunctionList: Array<{ text: string, value: Conjunctions }> = [
    { text: "all", value: Conjunctions.and },
    { text: "any", value: Conjunctions.or },
  ];

  selectedOperator: { text: string, value: Operators };

  operatorList: Array<{ text: string, value: Operators }> = [
    { text: "Equal To", value: Operators.EqualTo },
    { text: "Contains", value: Operators.Contains },
    { text: "Does Not Contain", value: Operators.DoesNotContain },
    { text: "Is In List", value: Operators.IsInList },
    { text: "Is Not In List", value: Operators.IsNotInList },
    { text: "Not Equal To", value: Operators.NotEqualTo },
    { text: "Starts With", value: Operators.StartsWith }
  ];

  public defaultItem: { text: string, value: Operators } = this.operatorList.find(v => v.value == Operators.EqualTo);

  constructor(private qbSvc: QueryBuilderService) { }

  ngOnInit() {
    this.selectedOperator = this.operatorList.find((t) => t.value == this.condition.operator);
  }

  onRemoveClick(event$: Condition) {
    this.qbSvc.removeCondition(event$);
  }

  onAddConditionClick(event$: Condition) {
    this.qbSvc.addNewCondition(event$);
  }

  onConjunctionClick(dataItem: { text: string, value: Conjunctions }) {
    this.condition.conjunction = dataItem.value;
    this.qbSvc.editCondition(this.condition);
  }

  onOperatorClick(dataItem: { text: string, value: Operators }) {
    this.condition.operator = dataItem.value;
    this.selectedOperator = dataItem;
    this.qbSvc.editCondition(this.condition);
  }

 onSelectKeyClick(model:ModelMetaData, selected: Condition) {
   selected.key = model.fullPath;
   selected.text = model.text;
   this.qbSvc.editCondition(selected);
  }
  
  onValueChanged(data: string) {
    this.qbSvc.editCondition(this.condition);
  }

  

}
