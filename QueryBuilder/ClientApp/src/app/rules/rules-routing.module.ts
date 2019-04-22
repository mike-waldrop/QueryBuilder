import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RulesRootComponent } from "src/app/rules/rules-root/rules-root.component";

const routes: Routes = [
  {
    path: "rules",
    component: RulesRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule {
}
