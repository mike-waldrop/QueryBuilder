import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Condition } from 'src/app/query-builder/services/condition.model';
import { Query } from 'src/app/query-builder/services/query.model';
import { Operators } from 'src/app/query-builder/services/Operators';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: Query = new Query();
  private querySource = new BehaviorSubject<Query>(null);
  queryCurrent = this.querySource.asObservable();


  constructor(private http: HttpClient) {
     this.buildTestQuery();
    
  }

  addCondition(message: Condition) {
    this.query.conditions.push(message);
    this.querySource.next(this.query);
  }


  private buildTestQuery() {
    var newQuery = new Query();
    
    var condition1 = new Condition("color", Operators.EqualTo, "red");
    var condition2 = new Condition("dog", Operators.StartsWith, "rex");
    var condition3 = new Condition("cat", Operators.IsInList, "fred");
    var condition4 = new Condition("person", Operators.Contains, "bob");
    var condition5 = new Condition("xxx", Operators.Contains, "yyy");

    
    condition2.items.push(condition3);
    condition2.items.push(condition4);
    condition4.items.push(condition5);

    newQuery.conditions.push(condition1);
    newQuery.conditions.push(condition2);

    this.query = newQuery;
    this.querySource.next(newQuery);
  }


  getModel(): Observable<any[]> {
    const apiMethod = "GetModel";
    return this.http.get<any>(`/api/querybuilder/GetModel`, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)));
  }
}
