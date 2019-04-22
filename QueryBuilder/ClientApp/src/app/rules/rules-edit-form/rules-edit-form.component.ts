import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { IntlService } from "@progress/kendo-angular-intl";

import { RuleDefinition } from "src/app/core/services/rules/rule-definition.model";
import { LookupsService } from "src/app/core/services/lookups/lookups.service";
import { IoTEvent } from "src/app/core/services/lookups/iotEvent";
import { Engine } from "src/app/core/services/lookups/engine";

@Component({
  selector: "app-rules-edit-form",
  templateUrl: "./rules-edit-form.component.html",
  styleUrls: ["./rules-edit-form.component.css"]
})
export class RulesEditFormComponent {

  active = false;
  editForm = new FormGroup({
    ruleId: new FormControl(),
    matchExpression: new FormControl(),
    startDtTm: new FormControl(),
    endDtTm: new FormControl(),
    assetType: new FormControl(),
    assetId: new FormControl(),
    eventType: new FormControl(),
    engines: new FormControl(),
    createDateTime: new FormControl(),
    createdById: new FormControl(),
    manualFlag: new FormControl()
  });

  //engineList: Array<string> = ["ENGINE-A", "ENGINE-B", "ENGINE-C"];
  engineList: Engine[] = [];
  events: IoTEvent[] = [];

  @Input()
  isNew = false;

  @Input()
  set model(rule: RuleDefinition) {
    this.editForm.reset(rule);
    this.active = rule !== undefined;
  }

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();
  @Output()
  save: EventEmitter<RuleDefinition> = new EventEmitter();

  constructor(private lookupsSvc: LookupsService) {}

  

  ngOnInit(): void {
    this.lookupsSvc.getAllEvents().subscribe(a => this.events = a);
    this.lookupsSvc.getAllEngines().subscribe(a => this.engineList = a);
  }

  onSave(e): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
