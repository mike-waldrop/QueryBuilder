import { Component, OnInit } from "@angular/core";
import { Observable } from "Rxjs";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { State, process } from "@progress/kendo-data-query";
import { RulesService } from "src/app/core/services/rules/rules.service";
import { RuleDefinition } from "src/app/core/services/rules/rule-definition.model";
import { map } from "rxjs/operators";
import { LookupsService } from "src/app/core/services/lookups/lookups.service";
import { Engine } from "src/app/core/services/lookups/engine";


@Component({
  selector: "app-rules-list",
  templateUrl: "./rules-list.component.html",
  styleUrls: ["./rules-list.component.css"]
})
export class RulesListComponent implements OnInit {

  view: Observable<GridDataResult>;
  engines: Engine[] = [];
  gridState: State = { sort: [], skip: 0, take: 10 };

  editDataItem: RuleDefinition;
  isNew: boolean;

  constructor(private rulesSvc: RulesService, private lookupsSvc: LookupsService) {
    this.lookupsSvc.getAllEngines().subscribe(e => this.engines = e);
  }

  ngOnInit(): void {
    this.view = this.rulesSvc.pipe(map(data => process(data, this.gridState)));
    this.rulesSvc.read();

  }

  onStateChange(state: State) {
    this.gridState = state;
    this.rulesSvc.read();
  }

  addHandler() {
    this.editDataItem = new RuleDefinition();
    this.editDataItem.engines = [];
    this.editDataItem.manualFlag = false;
    this.isNew = true;
  }

  editHandler({ dataItem }) {
    this.isNew = false;
    this.rulesSvc.getRule(dataItem).subscribe(r => this.editDataItem = r);

  }

  cancelHandler() {
    this.editDataItem = undefined;
  }

  saveHandler(rule: RuleDefinition) {
    this.rulesSvc.saveRule(rule, this.isNew).subscribe();
    this.editDataItem = undefined;
  }

  removeHandler({ dataItem }) {
    this.rulesSvc.deleteRule(dataItem).subscribe();
  }
}
