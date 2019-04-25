import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/query-builder/services/events.service/events.service';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { Condition } from "src/app/query-builder/models/condition.model";
import { Query } from "src/app/query-builder/models/query.model";
import { Conjunctions } from 'src/app/query-builder/models/conjunctions.model';
import { Operators } from 'src/app/query-builder/models/operators.model';

@Component({
  selector: 'query-builder-conditions',
  templateUrl: './query-builder-conditions.component.html',
  styleUrls: ['./query-builder-conditions.component.css']
})
export class QueryBuilderConditionsComponent implements OnInit {

  public query: Query;

  conjunctionList: Array<{ text: string, value: Conjunctions }> = [
    { text: "all", value: Conjunctions.and },
    { text: "any", value: Conjunctions.or },
  ];

  constructor(private qbSvc: QueryBuilderService, private eventsSvc: EventsService) { }

  ngOnInit() {
    this.qbSvc.queryCurrent.subscribe(q => this.query = q);
  }

  onConjunctionClick(dataItem: { text: string, value: Conjunctions }) {
    this.query.conjunction = dataItem.value;
    this.qbSvc.editQuery(this.query);
    //this.query.conditions.forEach(v => {
    //  v.conjunction = dataItem.value;
    //  this.qbSvc.editCondition(v);
    //});
  }

  public children = (dataitem: any): Observable<any[]> => {
    return of(dataitem.conditions);
  };

  public hasChildren = (dataitem: any): boolean => {
    return !!dataitem.conditions;
  };
}
