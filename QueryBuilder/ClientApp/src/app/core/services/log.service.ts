import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LogService {
  subject = new BehaviorSubject<string[]>([]);
  messages: string[]=[];

  constructor(private http: HttpClient) {}


  clearLog() {
    this.messages = [];
    this.subject.next(this.messages);
  }

  getLog(): Observable<string[]> {
    return this.subject.asObservable();
  }

  logMsg(err: string) {
    this.messages.push(err);
    this.subject.next(this.messages);
  }

}
