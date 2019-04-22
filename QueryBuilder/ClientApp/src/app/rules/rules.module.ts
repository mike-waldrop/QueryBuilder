import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RulesRootComponent } from "./rules-root/rules-root.component";
import { RulesRoutingModule } from "src/app/rules/rules-routing.module";
import { RulesListComponent } from "./rules-list/rules-list.component";
import { RulesEditFormComponent } from "./rules-edit-form/rules-edit-form.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [RulesRootComponent, RulesListComponent, RulesEditFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RulesRoutingModule
  ]
})
export class RulesModule {
}
