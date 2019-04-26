import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Condition } from 'src/app/query-builder/models/condition.model';
import { Query } from 'src/app/query-builder/models/query.model';
import { Operators } from 'src/app/query-builder/models/operators.model';
import remove from 'lodash/remove';
import { ModelMetaData } from "src/app/query-builder/models/model-meta-data.model";
import { Conjunctions } from "../../models/conjunctions.model";


@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: Query = new Query();
  private querySource = new BehaviorSubject<Query>(null);
  queryCurrent = this.querySource.asObservable();

  private modelMetaDataSource = new BehaviorSubject<ModelMetaData[]>([]);
  modelMetaDataCurrent = this.modelMetaDataSource.asObservable();

  constructor(private http: HttpClient) {
    this.buildTestQuery();
    this.getModelMetaData();
  }

  addCondition(message: Condition) {
    this.query.add(message);
    this.querySource.next(this.query);
  }

  addNewCondition(parent: Condition) {
    let newCondition = new Condition({ id: "<id>", text: "<text>", key: "<key>", operator: Operators.EqualTo, value: "<value>", type: "string" });
    if (parent.conditions.length == 0)
      parent.conjunction = Conjunctions.and;
    parent.add(newCondition);
    this.querySource.next(this.query);
  }

  editCondition(message: Condition) {
    let index = message.parent.conditions.indexOf(message);
    if (index !== -1) {
      message.parent.conditions[index] = message;
      this.querySource.next(this.query);
    }
  }

  editQuery(message: Query) {
    this.querySource.next(message);
  }

  removeCondition(message: Condition) {
    let index = message.parent.conditions.indexOf(message);
    if (index !== -1) {
      message.parent.conditions.splice(index, 1);
    }


    //remove(message.parent, function (currentObject) {
    //  return currentObject.key === message.key;
    //});

    this.querySource.next(this.query);
  }


  private buildTestQuery() {
    var newQuery = new Query();
    var condition1 = new Condition({ id: "color", text: "color", key: "color-key", operator: Operators.EqualTo, value: "red", type: "string" });
    var condition2 = new Condition({ id: "dog", text: "dog", key: "dog-key", operator: Operators.StartsWith, value: "rex", type: "string" });
    var condition3 = new Condition({ id: "cat", text: "cat", key: "cat-key", operator: Operators.IsInList, value: "fred", type: "string" });
    var condition4 = new Condition({ id: "person", text: "person", key: "person-key", operator: Operators.Contains, value: "bob", type: "string" });
    var condition5 = new Condition({ id: "xxx", text: "xxx", key: "xxx-key", operator: Operators.Contains, value: "yyy", type: "string" });
    condition2.add(condition3);
    condition2.add(condition4);
    condition4.add(condition5);
    newQuery.add(condition1);
    newQuery.add(condition2);

    this.query = newQuery;
    this.querySource.next(newQuery);
  }


  getModelMetaData() {
    const apiMethod = "getModelMetaData";
    this.http.get<any>(`/api/querybuilder/getModelMetaData`, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)))
      .subscribe(s => {
        this.modelMetaDataSource.next(s);
      });
  }
}
