import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/query-builder/services/events.service/events.service';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { Condition } from "src/app/query-builder/services/condition.model";
import { Query } from "src/app/query-builder/services/query.model";

@Component({
  selector: 'query-builder-conditions',
  templateUrl: './query-builder-conditions.component.html',
  styleUrls: ['./query-builder-conditions.component.css']
})
export class QueryBuilderConditionsComponent implements OnInit {

  public query: Observable<Query>;

  constructor(private qbSvc: QueryBuilderService, private eventsSvc: EventsService) { }

  ngOnInit() {
    this.query = this.qbSvc.queryCurrent;
  }

  public children = (dataitem: any): Observable<any[]> => {
    return of(dataitem.items);
  };

  public hasChildren = (dataitem: any): boolean => {
    return !!dataitem.items;
  };
}
