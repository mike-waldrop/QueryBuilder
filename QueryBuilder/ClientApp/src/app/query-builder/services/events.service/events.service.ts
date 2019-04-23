import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Condition } from 'src/app/query-builder/services/condition.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private addConditionSource = new BehaviorSubject<Condition>(null);
  addConditionMessage = this.addConditionSource.asObservable();

  constructor() { }

  addCondition(message: Condition) {
    this.addConditionSource.next(message)
  }

}
