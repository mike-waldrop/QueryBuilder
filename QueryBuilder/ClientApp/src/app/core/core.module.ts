import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorService } from "src/app/core/services/error.service";
import { LogService } from "src/app/core/services/log.service";
import { RulesService } from "src/app/core/services/rules/rules.service";
import { LookupsService } from "src/app/core/services/lookups/lookups.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ErrorService, LogService, RulesService, LookupsService]
})
export class CoreModule {
}
