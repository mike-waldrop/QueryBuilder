import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { RuleDefinition } from "src/app/core/services/rules/rule-definition.model";
import { IntlService } from "@progress/kendo-angular-intl";
import { Engine } from "src/app/core/services/lookups/engine";
import { LookupsService } from "src/app/core/services/lookups/lookups.service";
import { IoTEvent } from "src/app/core/services/lookups/iotEvent";


@Injectable({
  providedIn: "root"
})
export class RulesService extends BehaviorSubject<any[]> {

  constructor(private http: HttpClient, private lookupsSvc: LookupsService) {
    super([]);
    this.lookupsSvc.getAllEngines().subscribe(e => this.engines = e);
    this.lookupsSvc.getAllEvents().subscribe(e => this.iotEvents = e);
  }

  private engines: Engine[] = [];
  private iotEvents: IoTEvent[] = [];

  private data: any[] = [];

  private apiPrefix: string = "/api/rules";

  read() {
    if (this.data.length)
      return super.next(this.data);

    this.getAllRules()
      .pipe(tap(data => { this.data = data; }))
      .subscribe(data => { super.next(data); });
  }

  getRule(rule: RuleDefinition): Observable<RuleDefinition> {
    const apiMethod = "GetRule";
    const params = new HttpParams().set("ruleId", rule.ruleId.toString());
    return this.http.get<RuleDefinition>(`${this.apiPrefix}/${rule.ruleId}`, { withCredentials: true })
      .pipe(map(r => this.mapRuleDefinition(r)),
        tap(() => console.log(apiMethod)));
  }

  getAllRules(): Observable<RuleDefinition[]> {
    const apiMethod = "getAllRules";
    return this.http.get<RuleDefinition[]>(`${this.apiPrefix}`, { withCredentials: true })
      .pipe(
        map(list => {
          list.map(r => this.mapRuleDefinition(r));
          return list;
        }),
        tap(() => console.log(apiMethod)));
  }

  saveRule(rule: RuleDefinition, isNew?: boolean): Observable<RuleDefinition | any> {
    return (isNew) ? this.createRule(rule) : this.updateRule(rule);
  }

  deleteRule(rule: RuleDefinition): Observable<any> {
    this.reset();
    const params = new HttpParams().set("ruleId", rule.ruleId.toString());
    const apiMethod = "deleteRule";
    return this.http.delete<any>(`${this.apiPrefix}/${rule.ruleId}`, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)),
        tap(() => this.read()));
  }

  private parse(d): Date {
    if (!!d) {
      const date = new Date(d);
      if (!isNaN(date.getTime()))
        return date;
    }
    return undefined;
  }

  private mapRuleDefinition(item: RuleDefinition): RuleDefinition {
    //var ruleDefinition = new RuleDefinition();
    //_.cloneDeep(item);
    item.startDtTm = this.parse(item.startDtTm);
    item.endDtTm = this.parse(item.endDtTm);
    item.createDateTime = this.parse(item.createDateTime);

    var engineArray = this.engines.filter(result => item.engines.some(x => x == (result.id)));
    item.engines = engineArray;
    item.eventType = this.iotEvents.find(value => value.id == item.eventType);
    return item;
  }

  private createRule(rule: RuleDefinition): Observable<RuleDefinition> {
    this.reset();
    const apiMethod = "createRule";
    return this.http.post<RuleDefinition>(`${this.apiPrefix}`, rule, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)),
        tap(() => this.read()));
  }

  private updateRule(rule: RuleDefinition): Observable<any> {
    this.reset();
    const apiMethod = "updateRule";
    rule.engines = rule.engines.map(e => (e as Engine).id);
    rule.eventType = (rule.eventType as IoTEvent).id;
    return this.http.put<any>(`${this.apiPrefix}`, rule, { withCredentials: true })
      .pipe(
        tap(() => console.log(apiMethod)),
        tap(() => this.read()));
  }

  resetItem(dataItem: any) {
    if (!dataItem) {
      return;
    }

    // find orignal data item
    const originalDataItem = this.data.find(item => item.ruleId === dataItem.ruleId);
    // revert changes
    Object.assign(originalDataItem, dataItem);
    super.next(this.data);
  }

  private reset() {
    this.data = [];
  }
}
