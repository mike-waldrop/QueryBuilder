import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  constructor(private http: HttpClient) { }

  getModel(): Observable<any[]> {
    const apiMethod = "getAllEngines";
    return this.http.get<any>(`/api/querybuilder/GetModel`, { withCredentials: true })
      .pipe(
        map(v => {
        return v;
      }),
        tap(() => console.log(apiMethod)));
  }
}
