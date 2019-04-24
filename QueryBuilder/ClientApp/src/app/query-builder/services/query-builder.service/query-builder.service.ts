import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Condition } from 'src/app/query-builder/services/condition.model';
import { Query } from 'src/app/query-builder/services/query.model';
import { Operators } from 'src/app/query-builder/services/operators.model';
import remove from 'lodash/remove';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: Query = new Query();
  private querySource = new BehaviorSubject<Query>(null);
  queryCurrent = this.querySource.asObservable();


  private modelDataSource = new BehaviorSubject<any[]>([]);
  modelDataCurrent = this.modelDataSource.asObservable();

  constructor(private http: HttpClient) {
    this.buildTestQuery();
    this.getModel();
  }

  addCondition(message: Condition) {
    this.query.add(message);
    this.querySource.next(this.query);
  }

  addNewCondition(parent: Condition) {
    let newCondition = new Condition("<text>", "<key>", Operators.EqualTo, "<value>");
    parent.add(newCondition);
    this.querySource.next(this.query);
  }

  removeCondition(message: Condition) {
    let index = message.arrayOwner.indexOf(message);
    if (index !== -1) {
      message.arrayOwner.splice(index, 1);
    }


    //remove(message.parent, function (currentObject) {
    //  return currentObject.key === message.key;
    //});

    this.querySource.next(this.query);
  }


  private buildTestQuery() {
    var newQuery = new Query();

    var condition1 = new Condition("color", "color-key", Operators.EqualTo, "red");
    var condition2 = new Condition("dog", "dog-key", Operators.StartsWith, "rex");
    var condition3 = new Condition("cat", "cat-key", Operators.IsInList, "fred");
    var condition4 = new Condition("person", "person-key", Operators.Contains, "bob");
    var condition5 = new Condition("xxx", "xxx-key", Operators.Contains, "yyy");


    condition2.add(condition3);
    condition2.add(condition4);
    condition4.add(condition5);

    newQuery.add(condition1);
    newQuery.add(condition2);

    this.query = newQuery;
    this.querySource.next(newQuery);
  }


  getModel() {
    const apiMethod = "GetModel";
    this.http.get<any>(`/api/querybuilder/GetModel`, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)))
      .subscribe(s => {
        this.modelDataSource.next(s);
      });
  }
}
