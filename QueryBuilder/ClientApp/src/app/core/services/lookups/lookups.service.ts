import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Engine } from "src/app/core/services/lookups/engine";
import { IoTEvent } from "src/app/core/services/lookups/iotEvent";


@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private http: HttpClient) { }

  getAllEngines(): Observable<Engine[]> {
    const apiMethod = "getAllEngines";
    return this.http.get<Engine[]>(`/api/lookups/engines`, { withCredentials: true })
      .pipe(
         tap(() => console.log(apiMethod)));
  }

  getAllEvents(): Observable<IoTEvent[]> {
    const apiMethod = "getAllEvents";
    return this.http.get<IoTEvent[]>(`/api/lookups/IoTEvents`, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)));
  }
}
